const Settings = require('../models/Settings');
const cloudinary = require('../config/cloudinary');

const settingsController = {
    getSettings: async (req, res) => {
        try {
            let settings = await Settings.findOne();
            if (!settings) {
                settings = await Settings.create({});
            }
            res.json(settings);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    updateSettings: async (req, res) => {
        try {
            const settings = await Settings.findOneAndUpdate({}, req.body, { new: true, upsert: true });
            res.json(settings);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    addAudioTrack: async (req, res) => {
        try {
            const { title, url, publicId } = req.body;
            const settings = await Settings.findOne();
            if (settings.audioTracks.length >= 3) {
                return res.status(400).json({ message: 'Maximum 3 audio tracks allowed' });
            }
            settings.audioTracks.push({ title, url, publicId });
            await settings.save();
            res.json(settings);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    deleteAudioTrack: async (req, res) => {
        try {
            const { trackId } = req.params;
            const settings = await Settings.findOne();
            const track = settings.audioTracks.id(trackId);
            if (track) {
                await cloudinary.uploader.destroy(track.publicId, { resource_type: 'video' }); // Audio is resource_type 'video' in cloudinary
                settings.audioTracks.pull(trackId);
                await settings.save();
            }
            res.json(settings);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
};

module.exports = settingsController;
