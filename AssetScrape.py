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
import subprocess
root_dir = os.path.dirname(os.path.abspath(__file__))
def BlendtoObj(Blendfile):
    if Blendfile.endswith(".blend"):
        Blendout, Blendext = os.path.splitext(Blendfile)
        os.chdir(root_dir + '/dist/')
        full_path = os.path.abspath(os.getcwd())
        BlendfilePath = full_path + "/assets/"+ Blendfile
        BlendoutPath = full_path + "/assets/" + Blendout + '.obj'

        os.chdir(root_dir + '/src/')
        retval = subprocess.call(['blender', '--background', BlendfilePath, '-P',
            'BlendtoObj.py', '--', BlendoutPath])
        return retval
        #os.system('blender ', BlendfilePath', --background --python + BlendtoObj.py ' + BlendoutPath)


def AssetScrape():
    #Loop through this 5 or so times?
    argv = sys.argv
    print argv
    loopInt = 0
    loopEnd = 0
    if argv[1] == 1:
        loopInt = 0
        loopEnd = 4
    elif argv[1] == 2:
        loopInt = 4
        loopEnd = 8
    else:
        loopInt = 0
        loopEnd = 4
    while loopInt < (loopEnd):
        print str(loopInt)
        pageNum = random.randint(0, 103)
        address = ""
        if pageNum == 0:
            address = "https://opengameart.org/art-search-advanced?keys=&field_art_type_tid%5B%5D=10&sort_by=count&sort_order=DESC"
        else:
            address = "https://opengameart.org/art-search-advanced?keys=&title=&field_art_tags_tid_op=or&field_art_tags_tid=&name=&field_art_type_tid[0]=10&field_art_licenses_tid[2]=2&field_art_licenses_tid[3]=3&field_art_licenses_tid[6]=6&field_art_licenses_tid[5]=5&field_art_licenses_tid[10310]=10310&field_art_licenses_tid[4]=4&field_art_licenses_tid[8]=8&field_art_licenses_tid[7]=7&sort_by=count&sort_order=DESC&items_per_page=24&collection=&page=" + str(pageNum)
        
        page = requests.get(address)
        tree = html.fromstring(page.content)
    
        Assets = tree.xpath('//span[@class="art-preview-title"]/a/@href')
        #print Assets
        AssetPage = random.choice(Assets)
        AssetPage = "https://opengameart.org" + AssetPage
        
        #print AssetPage
    
        page = requests.get(AssetPage)
        tree = html.fromstring(page.content)
        
        author = tree.xpath('//span[@class="username"]/a/text()')
        if author == []:
            author = tree.xpath('//span[@class="username"]/text()')
        date = tree.xpath('//div[@class="group-left left-column"]//div[@class="field field-name-post-date field-type-ds field-label-hidden"]//div[@class="field-item even"]/text()')
        title = tree.xpath('//div[@property="dc:title"]/h2/text()')
        model = tree.xpath('//span[@class="file"]/a/@href') #Still array of downloads! Look for blend or zip
        #print author[0]
        #print date[0]
        #print title[0]
        #print model 
        #filename, file_ext = os.path.splitext(model[0])
        #print '../dist/assets/' + os.path.basename(model[0])
        

        for i in model:
            filename, file_ext = os.path.splitext(i)
            if file_ext == ".blend":
                modelResponse = requests.get(i, stream=True)

                blend_file = str(loopInt) + '.blend'
                with open(root_dir + '/dist/assets/' + blend_file, 'wb') as fd:
                    for chunk in modelResponse.iter_content(2000): #2000 bytes per chunk
                        fd.write(chunk)
                fd.close()
                
                print  blend_file
                retval = BlendtoObj(blend_file)
                if retval == 0:
                    print "Downloaded Model " + str(loopInt) + "!"
                    text = open(root_dir + '/dist/assets/' + str(loopInt) + '.txt', 'w') #File is title, author, date
                    text.write(unicode(title[0], "utf-8") + '\n')
                    text.write(unicode(author[0], "utf-8") + '\n')
                    text.write(unicode(date[0], "utf-8"))
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
