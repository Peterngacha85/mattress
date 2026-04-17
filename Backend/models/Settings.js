const mongoose = require('mongoose');

const audioTrackSchema = new mongoose.Schema({
    title: { type: String, required: true },
    url: { type: String, required: true }, 
    publicId: { type: String, required: true }
});

const settingsSchema = new mongoose.Schema({
    whatsappNumber: { type: String, default: '0716462683' },
    mapLocation: { type: String, default: 'Ruiru, Kenya' },
    heroBgImage: { type: String }, // New dynamic hero background
    audioTracks: [audioTrackSchema]
}, { timestamps: true });

module.exports = mongoose.model('Settings', settingsSchema);
