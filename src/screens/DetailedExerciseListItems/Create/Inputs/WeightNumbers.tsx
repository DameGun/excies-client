import { useTranslation } from 'react-i18next';
import { Pressable, Text, View } from 'react-native';

import { NumberInputButton } from '@/components';
import type { WeightMeasurementSystemType } from '@/constants/detailedExerciseListItem';
import {
  CreateDetailedExerciseListItemParameterType,
  ItemValueOperationType,
} from '@/constants/detailedExerciseListItem';
import { useStyles } from '@/hooks/useStyles';
import type { DetailedOperationType } from '@/types/detailedExerciseListItem';
import { handleInputButtonForWeight } from '@/utils/detailedExerciseListItemOperations';

import { getStyles } from './styles';

type WeightNumbersProps = {
  isActive: boolean;
  setParameterType(type: CreateDetailedExerciseListItemParameterType): void;
  handleWeight(weight: number): void;
  weight: number;
  activeWeightSystem: WeightMeasurementSystemType;
};

export function WeightNumbers({
  isActive,
  setParameterType,
  handleWeight,
  weight,
  activeWeightSystem,
}: WeightNumbersProps) {
  const styles = useStyles(getStyles);
  const { t } = useTranslation();

  const handleParameterType = () => {
    setParameterType(CreateDetailedExerciseListItemParameterType.Weight);
  };

  const handleWeightInputButtonClick = (data: DetailedOperationType) => {
    handleWeight(handleInputButtonForWeight(data, weight));
  };

  return (
    <Pressable onPress={handleParameterType} style={styles.input(isActive)}>
      <View style={styles.inputButtonsContainer}>
        <NumberInputButton
          type={ItemValueOperationType.Decrease}
          number={5}
          showOperator={true}
          onPress={handleWeightInputButtonClick}
        />
        <NumberInputButton
          type={ItemValueOperationType.Decrease}
          number={1}
          showOperator={false}
          onPress={handleWeightInputButtonClick}
        />
      </View>
      <Text style={styles.inputTitle}>
        {t(`detailedExerciseListItems.weightBadge.${activeWeightSystem}`, { value: weight })}
      </Text>
      <View style={styles.inputButtonsContainer}>
        <NumberInputButton
          type={ItemValueOperationType.Increase}
          number={1}
          showOperator={false}
          onPress={handleWeightInputButtonClick}
        />
        <NumberInputButton
          type={ItemValueOperationType.Increase}
          number={5}
          showOperator={true}
          onPress={handleWeightInputButtonClick}
        />
      </View>
    </Pressable>
  );
}
