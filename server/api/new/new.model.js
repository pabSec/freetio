'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './new.events';

var NewSchema = new mongoose.Schema({
  title: String,
  description: String,
  link: String,
  tags: [String],
  avatar: String,
  thumbnail: String,
  created: { 
  	type: Date,
    default: Date.now,
    index: true
  }
});

registerEvents(NewSchema);
export default mongoose.model('New', NewSchema);
