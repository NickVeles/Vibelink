import React from 'react';
import { LogoTitleIcon, SettingsIcon } from './ui/Icon';
import { TouchableWithoutFeedback } from 'react-native';

const Header: React.FC = () => {
  return (
    <header style={styles.header}>
      <TouchableWithoutFeedback>
        <div style={styles.settingsButton}>
          <SettingsIcon height={32} width={32} />
        </div>
      </TouchableWithoutFeedback>
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
    borderBottom: '1px solid #ddd',
    borderRadius: '18px',
    margin: '4px',
  },
  settingsButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '50%',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    width: '40px',
    height: '40px',
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
