import React, { useEffect } from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
} from "react-native-reanimated";

const { width, height } = Dimensions.get("window");

interface iCard {
  source: ReturnType<typeof require>;
  index: number;
  shouldAnimateBack: Animated.SharedValue<boolean>;
}

const springPoint = (translation: number, values: [number, number, number]) => {
  "worklet";
  if (
    Math.abs(values[0] / 2) > Math.abs(translation) ||
    Math.abs(values[2] / 2) > Math.abs(translation)
  ) {
    return 0;
  }

  if (translation > 0) {
    return values[2];
  }

  return values[0];
};

const Card: React.FC<iCard> = ({ source, index, shouldAnimateBack }) => {
  const transitionY = useSharedValue(-height);
  const transitionX = useSharedValue(0);
  const rotateZ = useSharedValue(Math.random() * 10 - 5);
  const rotateX = useSharedValue(15);
  const perspective = useSharedValue(1000);
  const scale = useSharedValue(1);

  useEffect(() => {
    transitionY.value = withDelay(1500, withDelay(index * 125, withSpring(0)));
  }, []);

  useAnimatedReaction(
    () => shouldAnimateBack,
    () => {
      if (shouldAnimateBack.value) {
        rotateZ.value = withSpring(Math.random() * 10 - 5);
        rotateX.value = withSpring(15);
        scale.value = withSpring(1);
        transitionY.value = withSpring(0);
        transitionX.value = withDelay(
          1000,
          withDelay(
            (index + 1) * 125,
            withSpring(0, {}, () => {
              shouldAnimateBack.value = false;
            })
          )
        );
      }
    }
  );

  const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { y: number; x: number }
  >({
    onStart: (event, ctx) => {
      ctx.y = transitionY.value;
      ctx.x = transitionX.value;

      rotateX.value = withSpring(0);
      rotateZ.value = withSpring(0);
      scale.value = withSpring(1.1);
    },
    onActive: (event, ctx) => {
      transitionY.value = ctx.y + event.translationY;
      transitionX.value = ctx.x + event.translationX;
    },
    onEnd: (event) => {
      const dest = springPoint(event.translationX, [-width, 0, width]);
      transitionX.value = withSpring(dest);
      transitionY.value = withSpring(0);

      if (dest !== 0 && index === 0) {
        shouldAnimateBack.value = true;
      }
    },
  });

  const style = useAnimatedStyle(() => ({
    transform: [
      { perspective: perspective.value },
      { rotateZ: `${rotateZ.value}deg` },
      { rotateX: `${rotateX.value}deg` },
      { scale: scale.value },
      { translateX: transitionX.value },
      { translateY: transitionY.value },
    ],
  }));

  return (
    <View style={styles.container} pointerEvents="box-none">
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={[styles.imageWrapper, style]}>
          <Image source={source} style={styles.image} resizeMode="contain" />
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    padding: 80,
  },
  imageWrapper: {
    flex: 1,
  },

  image: {
    width: "100%",
    height: "100%",
  },
});

export default Card;
