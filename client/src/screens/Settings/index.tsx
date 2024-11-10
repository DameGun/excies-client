import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { ListItem } from '@/components';
import { Icons } from '@/constants/icons';
import { SettingsScreenNames } from '@/constants/navigation';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { useStyles } from '@/hooks/useStyles';
import { thunkLogout } from '@/redux/slices/auth/thunks';
import { changeTheme, selectCurrentColorMode } from '@/redux/slices/theme';
import type { SettingsStackNavigationParams } from '@/types/settingsStackNavigation';

import { getStyles } from './styles';

type SettingsScreenProps = NativeStackScreenProps<
  SettingsStackNavigationParams,
  SettingsScreenNames.SettingsScreen
>;

export function SettingsScreen({ navigation }: SettingsScreenProps) {
  const styles = useStyles(getStyles);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const colorMode = useAppSelector(selectCurrentColorMode);

  const handleTheme = () => {
    dispatch(changeTheme());
  };

  const handleLanguage = () => {
    navigation.navigate(SettingsScreenNames.LanguageScreen);
  };

  const handleLogout = () => {
    dispatch(thunkLogout());
  };

  return (
    <View style={styles.container}>
      <ListItem
        isFirst={true}
        isLast={false}
        iconName={Icons.DarkMode}
        title={t(`settings.darkMode.title`)}
        info={t(`settings.darkMode.${colorMode}`)}
        onPress={handleTheme}
      />
      <ListItem
        isFirst={false}
        isLast={false}
        iconName={Icons.Earth}
        title={t(`settings.language`)}
        onPress={handleLanguage}
      />
      <ListItem
        isFirst={false}
        isLast={true}
        iconName={Icons.Logout}
        title={t(`settings.logout`)}
        onPress={handleLogout}
      />
    </View>
  );
}
