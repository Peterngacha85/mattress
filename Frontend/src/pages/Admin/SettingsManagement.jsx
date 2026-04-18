import React, { useState, useEffect } from 'react';
import { Save, Music, Trash2, Upload, MapPin, Phone, Image } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../services/api';
import { useAppContext } from '../../context/AppContext';
import './SettingsManagement.css';

const SettingsManagement = () => {
  const [settings, setSettings] = useState({
    whatsappNumber: '',
    mapLocation: '',
    heroBgImage: '',
    audioTracks: []
  });
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [heroLoading, setHeroLoading] = useState(false);

  const fetchSettings = async () => {
    const { data } = await api.get('/settings');
    setSettings(data);
  };

  useEffect(() => { fetchSettings(); }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.put('/settings', {
        whatsappNumber: settings.whatsappNumber,
        mapLocation: settings.mapLocation,
        heroBgImage: settings.heroBgImage
      });
      toast.success("Settings saved!");
    } catch (err) {
      // Handled by interceptor
    } finally {
      setLoading(false);
    }
  };

  const handleHeroUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    setHeroLoading(true);
    try {
      const { data } = await api.post('/upload', formData);
      setSettings({ ...settings, heroBgImage: data.url });
      toast.success("Hero background updated locally. Save to confirm.");
    } catch (err) {
      // Handled by interceptor
    } finally {
      setHeroLoading(false);
    }
  };

  const handleAudioUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (settings.audioTracks.length >= 3) {
      toast.error("Maximum 3 tracks allowed");
      return;
    }
    const formData = new FormData();
    formData.append('file', file);
    setUploading(true);
    try {
      const { data: uploadData } = await api.post('/upload', formData);
      const trackData = {
        title: file.name.split('.')[0],
        url: uploadData.url,
        publicId: uploadData.publicId
      };
      const { data: updatedSettings } = await api.post('/settings/audio', trackData);
      setSettings(updatedSettings);
      toast.success("Audio track added");
    } catch (err) {
      // Handled by interceptor
    } finally {
      setUploading(false);
    }
  };

  const { triggerConfirm } = useAppContext();

  const deleteTrack = async (id) => {
    triggerConfirm({
      title: "Delete Audio Track?",
      message: "Are you sure you want to remove this background music? This will delete the file forever.",
      onConfirm: async () => {
        const { data } = await api.delete(`/settings/audio/${id}`);
        setSettings(data);
        toast.success("Track deleted");
      }
    });
  };

  return (
    <div className="settings-mgmt">
      <h2>Site <span>Settings</span></h2>
      <p className="subtitle">Configure your dynamic website content.</p>

      <div className="settings-grid">
        <section className="settings-card">
          <h3><Phone size={20} /> Contact & Branding</h3>
          <form onSubmit={handleUpdate}>
            <div className="form-group">
              <label>WhatsApp Number</label>
              <input 
                type="text" 
                value={settings.whatsappNumber} 
                onChange={e => setSettings({...settings, whatsappNumber: e.target.value})}
                placeholder="254..."
              />
            </div>
            <div className="form-group">
              <label>Shop Location (Name or Google Maps Link)</label>
              <input 
                type="text" 
                value={settings.mapLocation} 
                onChange={e => setSettings({...settings, mapLocation: e.target.value})}
                placeholder="e.g. Ruiru, Kenya OR https://share.google/..."
              />
            </div>
            
            <div className="form-group">
              <label>Hero Background Image</label>
              <div className="hero-upload-preview">
                {settings.heroBgImage && <img src={settings.heroBgImage} alt="Hero preview" className="mini-hero-preview" />}
                <label className={`hero-upload-btn ${heroLoading ? 'disabled' : ''}`}>
                   <Image size={18} /> {heroLoading ? 'Uploading...' : 'Change Hero BG'}
                   <input type="file" hidden onChange={handleHeroUpload} />
                </label>
              </div>
            </div>

            <button type="submit" className="save-btn" disabled={loading}>
              <Save size={18} /> {loading ? 'Saving...' : 'Save All Settings'}
            </button>
          </form>
        </section>

        <section className="settings-card">
          <h3><Music size={20} /> Background Audio (Max 3)</h3>
          <div className="audio-list">
            {settings.audioTracks.map(track => (
              <div key={track._id} className="audio-item">
                <div className="track-info">
                  <Music size={16} />
                  <span>{track.title}</span>
                </div>
                <button onClick={() => deleteTrack(track._id)} className="delete-track">
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
            {settings.audioTracks.length === 0 && <p className="empty-msg">No audio tracks uploaded.</p>}
          </div>
          
          {settings.audioTracks.length < 3 && (
            <label className={`upload-audio-btn ${uploading ? 'disabled' : ''}`}>
              <Upload size={18} /> {uploading ? 'Uploading...' : 'Add Audio Track'}
              <input type="file" accept="audio/*" hidden onChange={handleAudioUpload} disabled={uploading} />
            </label>
          )}
        </section>
      </div>
    </div>
  );
};

export default SettingsManagement;
