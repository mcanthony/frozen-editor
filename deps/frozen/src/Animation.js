/**

 Copyright 2011 Luis Montes

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

**/

define([
  './AnimFrame',
  'dcl',
  'dcl/bases/Mixer',
  'dojo/_base/lang'
], function(AnimFrame, dcl, Mixer, lang){

  'use strict';

 /**
 * Represents a series of frames that can be rendered as an animation.
 * @name Animation
 * @class Animation
 */

  var Animation = dcl(Mixer, {
    currFrameIndex: 0,
    animTime: 0,
    totalDuration: 0,
    height: 64,
    width: 64,
    image: null,

    constructor: function(){
      this.start();
    },
    createFromTile: function(frameCount, frameTimes, img, h, w, ySlot){
      //Deprecated method, use createFromSheet()
      return this.createFromSheet(frameCount, frameTimes, img, w, h, ySlot);
    },
    createFromSheet: function(frameCount, frameTimes, img, w, h, ySlot){
      var anim = new Animation({
        image: img,
        height: h,
        width: w
      });

      var isFTArray = lang.isArray(frameTimes);

      var currentFrameTime = 1;
      if(!ySlot){
        ySlot = 0;
      }
      for(var j = 0; j < frameCount; j++){
        if(isFTArray){
          currentFrameTime = frameTimes[j];
        } else {
          currentFrameTime = frameTimes;
        }
        anim.addFrame(currentFrameTime, j, ySlot);
      }
      return anim;
    },

    /**
      * Creates a duplicate of this animation. The list of frames
      * are shared between the two Animations, but each Animation
      * can be animated independently.
      * @name Animation#clone
      * @function
      *
    */
    clone: function(){
      return new Animation({
        image: this.image,
        frames: this.frames,
        totalDuration: this.totalDuration
      });
    },

    /**
      * Adds an image to the animation with the specified duration (time to display the image).
      * @name Animation#addFrame
      * @function
      * @param {Number} duration
      * @param {Number} imageSlotX
      * @param {Number} imageSlotY
      *
    */
    addFrame: function(duration, imageSlotX, imageSlotY){
      if(!this.frames){
        this.frames = [];
      }
      this.totalDuration += duration;
      this.frames.push(new AnimFrame({
        endTime: this.totalDuration,
        image: this.image,
        imgSlotX: imageSlotX,
        imgSlotY: imageSlotY
      }));
    },

    /**
      * Starts this animation over from the beginning.
      * @name Animation#start
      * @function
      *
    */
    start: function(){
      this.animTime = 0;
      this.currFrameIndex = 0;
    },


    /**
      * Updates this animation's current image (frame), if neccesary.
      * @name Animation#update
      * @function
      * @param {Number} elapsedTime Elapsed time in milliseconds
      *
    */
    update: function(elapsedTime){
      if (this.frames.length > 1) {
        this.animTime += elapsedTime;

        if (this.animTime >= this.totalDuration) {
          this.animTime = this.animTime % this.totalDuration;
          this.currFrameIndex = 0;
        }

        while (this.animTime > this.getFrame(this.currFrameIndex).endTime) {
          this.currFrameIndex++;
        }
      }
    },
    getImage: function(){
      return this.image;
    },
    getFrame: function(i){
      return this.frames[i];
    },


    /**
      * Gets this Animation's current animation frame. Returns null if this animation has no frames.
      * @name Animation#getCurrentFrame
      * @function
      *
    */
    getCurrentFrame: function(){
      if (this.frames.length === 0) {
        return null;
      } else {
        return this.getFrame(this.currFrameIndex);
      }
    },

    /**
      * Draws the current frame into a 2d context.
      * @name Animation#draw
      * @function
      * @param {2dContext} context The HTML5 drawing canvas
      * @param {Number} x The x coordinate in the graphics context
      * @param {Number} y The y coordinate in the graphics context
      *
    */
    draw: function(context, x, y){
      var cf = this.getCurrentFrame();
      context.drawImage(this.image, cf.imgSlotX * this.width, cf.imgSlotY * this.height, this.width, this.height, x, y, this.width, this.height);
    }
  });

  return Animation;

});