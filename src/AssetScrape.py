# -*- coding: utf-8 -*-
"""
Created on Sat Apr 22 10:28:55 2017

@author: Connor
"""

import os
import random
import zipfile
import sys
import requests
from lxml import html

def AssetScrape():
    #Loop through this 5 or so times?
    loopInt = 0
    while loopInt <= 4:
        pageNum = random.randint(0, 104)
        address = ""
        if pageNum == 0:
            address = "https://opengameart.org/art-search-advanced?keys=&field_art_type_tid%5B%5D=10&sort_by=count&sort_order=DESC"
        else:
            address = "https://opengameart.org/art-search-advanced?keys=&title=&field_art_tags_tid_op=or&field_art_tags_tid=&name=&field_art_type_tid[0]=10&field_art_licenses_tid[2]=2&field_art_licenses_tid[3]=3&field_art_licenses_tid[6]=6&field_art_licenses_tid[5]=5&field_art_licenses_tid[10310]=10310&field_art_licenses_tid[4]=4&field_art_licenses_tid[8]=8&field_art_licenses_tid[7]=7&sort_by=count&sort_order=DESC&items_per_page=24&collection=&page=" + str(pageNum)
        
        page = requests.get(address)
        tree = html.fromstring(page.content)
    
        Assets = tree.xpath('//span[@class="art-preview-title"]/a/@href')
        print Assets
        AssetPage = random.choice(Assets)
        AssetPage = "https://opengameart.org" + AssetPage
        
        print AssetPage
    
        page = requests.get(AssetPage)
        tree = html.fromstring(page.content)
        
        author = tree.xpath('//span[@class="username"]/a/text()')
        date = tree.xpath('//div[@class="group-left left-column"]//div[@class="field field-name-post-date field-type-ds field-label-hidden"]//div[@class="field-item even"]/text()')
        title = tree.xpath('//div[@property="dc:title"]/h2/text()')
        model = tree.xpath('//span[@class="file"]/a/@href') #Still array of downloads! Look for blend or zip
        print author[0]
        print date[0]
        print title[0]
        print model 
        #filename, file_ext = os.path.splitext(model[0])
        #print '../dist/assets/' + os.path.basename(model[0])
        
        chunknum = 0
        for i in model:
            filename, file_ext = os.path.splitext(i)
            if file_ext == ".blend":
                modelResponse = requests.get(i, stream=True)
                with open('../dist/assets/' + os.path.basename(i), 'wb') as fd:
                    for chunk in modelResponse.iter_content(2000): #2000 bytes per chunk
                        fd.write(chunk)
                fd.close()
                        
                print "Downloaded Model!"
                text = open('../dist/assets/' + os.path.basename(filename) + '.txt', 'w') #File is title, author, date
                text.write(title[0] + '\n')
                text.write(author[0] + '\n')
                text.write(date[0])
                text.close()
                loopInt = loopInt + 1
                break
#            elif file_ext == ".zip":
#                modelResponse = requests.get(i, stream=True)
#                with open('../dist/assets/' + os.path.basename(i), 'wb') as fd:
#                    for chunk in modelResponse.iter_content(2000): #2000 bytes per chunk
#                        fd.write(chunk)
#                fd.close()
#                
#                print "Downloaded zip!"
#                zip_file = zipfile.Zipfile('../dist/assets/' + os.path.basename(i), 'r')
#                zip_file.extract
    
    
    
AssetScrape()