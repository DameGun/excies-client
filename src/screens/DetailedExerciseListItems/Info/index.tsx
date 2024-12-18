import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';

import { yupResolver } from '@hookform/resolvers/yup';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { CustomTextInput } from '@/components';
import { DeleteItemButton } from '@/components/DeleteItemButton';
import type { SupportedLanguageCodes } from '@/constants/i18n';
import type { HomeScreenNames } from '@/constants/navigation';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { useStyles } from '@/hooks/useStyles';
import { selectDetailedExerciseListItemById } from '@/redux/slices/detailedExerciseListItems';
import {
  thunkDeleteDetailedExerciseListItem,
  thunkUpdateDetailedExerciseListItem,
} from '@/redux/slices/detailedExerciseListItems/thunks';
import { selectIsUserChoosedMetricSystem } from '@/redux/slices/user';
import type {
  DeleteDetailedExerciseListItemDTO,
  UpdateDetailedExerciseListItemDTO,
} from '@/types/detailedExerciseListItem';
import type { HomeStackNavigationParams } from '@/types/homeStackNavigation';
import { getInfoModalScreenStylesDefault } from '@/utils/getInfoModalScreenStylesDefault';
import { getModalHeaderScreenOption } from '@/utils/getModalHeaderScreenOption';
import { convertLbsToKg, weightMeasurementSystem, weightValueFormat } from '@/utils/weightMeasure';

import { detailedExerciseListItemSchema } from './validation';

type DetailedExerciseListItemInfoModalScreenProps = NativeStackScreenProps<
  HomeStackNavigationParams,
  HomeScreenNames.DetailedExerciseListItemInfoModalScreen
>;

export function DetailedExerciseListItemInfoModalScreen({
  route,
  navigation,
}: DetailedExerciseListItemInfoModalScreenProps) {
  const { listId, listItemId, detailedId } = route.params;
  const item = useAppSelector((state) => selectDetailedExerciseListItemById(state, detailedId));
  const isMetricSystemChoosed = useAppSelector(selectIsUserChoosedMetricSystem);
  const styles = useStyles(getInfoModalScreenStylesDefault);
  const dispatch = useAppDispatch();
  const { t, i18n } = useTranslation();

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      rep: item?.rep,
      weight: weightValueFormat(item!.weight, isMetricSystemChoosed),
      notes: item?.notes ?? '',
    },
    resolver: yupResolver(detailedExerciseListItemSchema),
  });

  useEffect(() => {
    navigation.setOptions(
      getModalHeaderScreenOption({
        onPress: onSubmit,
        title: t('detailedExerciseListItems.edit.title'),
        disabled: !isValid,
      })
    );
  }, [isValid]);

  const onSubmit = handleSubmit(({ rep, weight, notes }) => {
    const convertedWeight = isMetricSystemChoosed ? weight : convertLbsToKg(weight);
    const payload: UpdateDetailedExerciseListItemDTO = {
      listId,
      listItemId,
      id: detailedId,
      detailedExerciseListItem: { rep, weight: convertedWeight, notes },
    };

    dispatch(thunkUpdateDetailedExerciseListItem(payload));
    navigation.goBack();
  });

  function handleDelete() {
    const language = i18n.language as SupportedLanguageCodes;
    const payload: DeleteDetailedExerciseListItemDTO = {
      listId,
      listItemId,
      id: detailedId,
      language,
    };

    dispatch(thunkDeleteDetailedExerciseListItem(payload));
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.text}>{t('detailedExerciseListItems.edit.notes.label')}</Text>
        <CustomTextInput
          name='notes'
          control={control}
          placeholder={t('detailedExerciseListItems.edit.notes.placeholder')}
        />
      </View>
      <View>
        <Text style={styles.text}>{t('detailedExerciseListItems.edit.repetitions.label')}</Text>
        <CustomTextInput
          name='rep'
          control={control}
          keyboardType='number-pad'
          inputMode='numeric'
          placeholder={t('detailedExerciseListItems.edit.repetitions.placeholder')}
        />
      </View>
      <View>
        <Text style={styles.text}>
          {t(
            `detailedExerciseListItems.edit.weight.label.${weightMeasurementSystem(isMetricSystemChoosed)}`
          )}
        </Text>
        <CustomTextInput
          name='weight'
          control={control}
          keyboardType='number-pad'
          inputMode='decimal'
          placeholder={t('detailedExerciseListItems.edit.weight.placeholder')}
        />
        <DeleteItemButton onPress={handleDelete} />
      </View>
    </View>
  );
}
