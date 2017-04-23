# -*- coding: utf-8 -*-
"""
Created on Sat Apr 22 15:31:17 2017

Code from http://atoav.com/2014/09/script-convert-blend-obj-via-commandline/
"""


import bpy
import sys
import os.path
 
for i in range(1, len(sys.argv)):
    if sys.argv[i] == "--":
        break
 
for file in sys.argv[i+1:]:
    # Select ALL (!) Files in Scene
    bpy.ops.object.select_all(action="SELECT")
 
 
    # Write a .obj file
    outfile = os.path.splitext(file)[0]+".obj"
    bpy.ops.export_scene.obj(filepath=outfile)