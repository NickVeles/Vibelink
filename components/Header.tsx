import React from 'react';
import { LogoTitleIcon } from './ui/Icon';
import { TouchableOpacity } from 'react-native';

interface HeaderProps {
  style?: React.CSSProperties;
  onLeftPress?: () => void;
  onRightPress?: () => void;
  leftButton?: React.ReactNode;
  rightButton?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({
  style,
  onLeftPress,
  onRightPress,
  leftButton,
  rightButton,
}) => {
  return (
    <header style={{ ...styles.header, ...style }}>
      {/* Left Button */}
      <div style={{ minWidth: 40 }}>
        {leftButton && (
          <TouchableOpacity style={styles.button} onPress={onLeftPress}>
            {leftButton}
          </TouchableOpacity>
        )}
      </div>

      {/* Logo */}
      <div style={styles.logoContainer}>
        <LogoTitleIcon height={32} width={128} />
      </div>

      {/* Right Button */}
      <div style={{ minWidth: 40 }}>
        {rightButton && (
          <TouchableOpacity style={styles.button} onPress={onRightPress}>
            {rightButton}
          </TouchableOpacity>
        )}
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
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  button: {
    background: 'rgba(176, 72, 91, 0.4)',
    border: 'none',
    borderRadius: '50%',
    padding: 4,
  },
  logoContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default Header;
