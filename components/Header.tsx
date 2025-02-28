import React from 'react';
import { LogoTitleIcon, SettingsIcon } from './ui/Icon';
import { TouchableOpacity } from 'react-native';
import { opacity } from 'react-native-reanimated/lib/typescript/Colors';

interface HeaderProps {
  style?: React.CSSProperties;
}

const Header: React.FC<HeaderProps> = ({ style }) => {
  return (
    <header style={{ ...styles.header, ...style }}>
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
    background: 'linear-gradient(225deg, rgb(176, 72, 91), rgb(255, 111, 97))',
    borderBottom: '1px solid rgb(102, 32, 44)',
  },
  settingsButton: {
    background: 'rgba(176, 72, 91, 0.4)',
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
