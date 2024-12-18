import { memo } from 'react';
import { Pressable, Text, View } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import { useStyles } from '@/hooks/useStyles';
import type { Exercise } from '@/types/exercise';
import type { ExerciseListItem } from '@/types/exerciseListItem';
import type { IconNames } from '@/types/icons';
import type { PressableProps } from '@/types/pressable';

import { getStyles } from './styles';

type LargeListItemProps = PressableProps<Exercise | ExerciseListItem> & {
  item: Exercise | ExerciseListItem;
  iconName?: IconNames;
};

export const LargeListItem = memo(({ item, iconName, onPress }: LargeListItemProps) => {
  const styles = useStyles(getStyles);

  const handlePress = () => {
    onPress?.(item);
  };

  return (
    <Pressable style={styles.listItemContainer} onPress={handlePress}>
      <MaterialCommunityIcons name={iconName} style={styles.icon} />
      <View style={styles.borderContainer}>
        <Text style={styles.listItem}>{item.name}</Text>
      </View>
    </Pressable>
  );
});
