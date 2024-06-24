import React, { useState } from 'react';
import styles from '../styles/ProfilePage.module.css';

interface ProfileProps {
  name: string;
  bio: string;
}

const Profile: React.FC<ProfileProps> = ({ name, bio }) => {
  const [bioText, setBioText] = useState(bio);
  const [isEditing, setIsEditing] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState('../images/IconePerfilDefault.png');

  const handleBioChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBioText(event.target.value);
  };

  const handleBioClick = () => {
    setIsEditing(true);
  };

  const handleBioBlur = () => {
    setIsEditing(false);
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setAvatarUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <label htmlFor="avatarInput">
        <img src={avatarUrl} alt={`${name}'s avatar`} className={styles.profileAvatar} />
      </label>
      <input type="file" id="avatarInput" className={styles.avatarInput} onChange={handleAvatarChange} accept="image/*"/>
      <div className={styles.profileDetails}>
        <h1 className={styles.profileName}>nome</h1>
        <h1 className={styles.profileEmail}>Email</h1>
        <textarea 
          className={styles.profileBio} 
          value={bioText} 
          onChange={handleBioChange} 
          onClick={handleBioClick}
          onBlur={handleBioBlur}
          readOnly={!isEditing}
          maxLength={500}
        />
      </div>
    </div>
  );
}

export default Profile;
