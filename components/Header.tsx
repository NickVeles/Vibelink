import React from 'react';
import { LogoTitleIcon, SettingsIcon } from './ui/Icon';
import { TouchableOpacity } from 'react-native';

const Header: React.FC = () => {
  return (
    <header style={styles.header}>
      <TouchableOpacity style={styles.settingsButton}>
        <SettingsIcon height={32} width={32} />
      </TouchableOpacity>
      <div style={styles.logoContainer}>
        <LogoTitleIcon height={32} width={128} />
      </div>
    </header>
  );
};

const styles = {
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px',
    backgroundColor: '#b0485b',
    borderBottom: '1px solid rgb(102, 32, 44)',
  },
  settingsButton: {
    background: 'none',
    border: 'none',
    borderRadius: '50%',
    padding: 4,
  },
  logoContainer: {
    marginLeft: '-40px',
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default Header;
