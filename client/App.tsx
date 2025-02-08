import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Animated, TouchableOpacity, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const elements = [
  { symbol: 'H', name: 'Hydrogen', atomicNumber: 1, category: 'Nonmetal' },
  { symbol: 'He', name: 'Helium', atomicNumber: 2, category: 'Noble Gas' },
  { symbol: 'Li', name: 'Lithium', atomicNumber: 3, category: 'Alkali Metal' },
  { symbol: 'Be', name: 'Beryllium', atomicNumber: 4, category: 'Alkaline Earth Metal' },
  { symbol: 'B', name: 'Boron', atomicNumber: 5, category: 'Metalloid' },
  { symbol: 'C', name: 'Carbon', atomicNumber: 6, category: 'Nonmetal' },
  { symbol: 'N', name: 'Nitrogen', atomicNumber: 7, category: 'Nonmetal' },
  { symbol: 'O', name: 'Oxygen', atomicNumber: 8, category: 'Nonmetal' },
  { symbol: 'F', name: 'Fluorine', atomicNumber: 9, category: 'Halogen' },
  { symbol: 'Ne', name: 'Neon', atomicNumber: 10, category: 'Noble Gas' },
  { symbol: 'Na', name: 'Sodium', atomicNumber: 11, category: 'Alkali Metal' },
  { symbol: 'Mg', name: 'Magnesium', atomicNumber: 12, category: 'Alkaline Earth Metal' },
  { symbol: 'Al', name: 'Aluminum', atomicNumber: 13, category: 'Post-Transition Metal' },
  { symbol: 'Si', name: 'Silicon', atomicNumber: 14, category: 'Metalloid' },
  { symbol: 'P', name: 'Phosphorus', atomicNumber: 15, category: 'Nonmetal' },
  { symbol: 'S', name: 'Sulfur', atomicNumber: 16, category: 'Nonmetal' },
  { symbol: 'Cl', name: 'Chlorine', atomicNumber: 17, category: 'Halogen' },
  { symbol: 'Ar', name: 'Argon', atomicNumber: 18, category: 'Noble Gas' },
  { symbol: 'K', name: 'Potassium', atomicNumber: 19, category: 'Alkali Metal' },
  { symbol: 'Ca', name: 'Calcium', atomicNumber: 20, category: 'Alkaline Earth Metal' },
  { symbol: 'Sc', name: 'Scandium', atomicNumber: 21, category: 'Transition Metal' },
  { symbol: 'Ti', name: 'Titanium', atomicNumber: 22, category: 'Transition Metal' },
  { symbol: 'V', name: 'Vanadium', atomicNumber: 23, category: 'Transition Metal' },
  { symbol: 'Cr', name: 'Chromium', atomicNumber: 24, category: 'Transition Metal' },
  { symbol: 'Mn', name: 'Manganese', atomicNumber: 25, category: 'Transition Metal' },
  { symbol: 'Fe', name: 'Iron', atomicNumber: 26, category: 'Transition Metal' },
  { symbol: 'Co', name: 'Cobalt', atomicNumber: 27, category: 'Transition Metal' },
  { symbol: 'Ni', name: 'Nickel', atomicNumber: 28, category: 'Transition Metal' },
  { symbol: 'Cu', name: 'Copper', atomicNumber: 29, category: 'Transition Metal' },
  { symbol: 'Zn', name: 'Zinc', atomicNumber: 30, category: 'Transition Metal' },
  { symbol: 'Ga', name: 'Gallium', atomicNumber: 31, category: 'Post-Transition Metal' },
  { symbol: 'Ge', name: 'Germanium', atomicNumber: 32, category: 'Metalloid' },
  { symbol: 'As', name: 'Arsenic', atomicNumber: 33, category: 'Metalloid' },
  { symbol: 'Se', name: 'Selenium', atomicNumber: 34, category: 'Nonmetal' },
  { symbol: 'Br', name: 'Bromine', atomicNumber: 35, category: 'Halogen' },
  { symbol: 'Kr', name: 'Krypton', atomicNumber: 36, category: 'Noble Gas' },
  { symbol: 'Rb', name: 'Rubidium', atomicNumber: 37, category: 'Alkali Metal' },
  { symbol: 'Sr', name: 'Strontium', atomicNumber: 38, category: 'Alkaline Earth Metal' },
  { symbol: 'Y', name: 'Yttrium', atomicNumber: 39, category: 'Transition Metal' },
  { symbol: 'Zr', name: 'Zirconium', atomicNumber: 40, category: 'Transition Metal' },
  { symbol: 'Nb', name: 'Niobium', atomicNumber: 41, category: 'Transition Metal' },
  { symbol: 'Mo', name: 'Molybdenum', atomicNumber: 42, category: 'Transition Metal' },
  { symbol: 'Tc', name: 'Technetium', atomicNumber: 43, category: 'Transition Metal' },
  { symbol: 'Ru', name: 'Ruthenium', atomicNumber: 44, category: 'Transition Metal' },
  { symbol: 'Rh', name: 'Rhodium', atomicNumber: 45, category: 'Transition Metal' },
  { symbol: 'Pd', name: 'Palladium', atomicNumber: 46, category: 'Transition Metal' },
  { symbol: 'Ag', name: 'Silver', atomicNumber: 47, category: 'Transition Metal' },
  { symbol: 'Cd', name: 'Cadmium', atomicNumber: 48, category: 'Transition Metal' },
  { symbol: 'In', name: 'Indium', atomicNumber: 49, category: 'Post-Transition Metal' },
  { symbol: 'Sn', name: 'Tin', atomicNumber: 50, category: 'Post-Transition Metal' },
  { symbol: 'Sb', name: 'Antimony', atomicNumber: 51, category: 'Metalloid' },
  { symbol: 'Te', name: 'Tellurium', atomicNumber: 52, category: 'Metalloid' },
  { symbol: 'I', name: 'Iodine', atomicNumber: 53, category: 'Halogen' },
  { symbol: 'Xe', name: 'Xenon', atomicNumber: 54, category: 'Noble Gas' },
  { symbol: 'Cs', name: 'Cesium', atomicNumber: 55, category: 'Alkali Metal' },
  { symbol: 'Ba', name: 'Barium', atomicNumber: 56, category: 'Alkaline Earth Metal' },
  { symbol: 'La', name: 'Lanthanum', atomicNumber: 57, category: 'Lanthanide' },
  { symbol: 'Ce', name: 'Cerium', atomicNumber: 58, category: 'Lanthanide' },
  { symbol: 'Pr', name: 'Praseodymium', atomicNumber: 59, category: 'Lanthanide' },
  { symbol: 'Nd', name: 'Neodymium', atomicNumber: 60, category: 'Lanthanide' },
  { symbol: 'Pm', name: 'Promethium', atomicNumber: 61, category: 'Lanthanide' },
  { symbol: 'Sm', name: 'Samarium', atomicNumber: 62, category: 'Lanthanide' },
  { symbol: 'Eu', name: 'Europium', atomicNumber: 63, category: 'Lanthanide' },
  { symbol: 'Gd', name: 'Gadolinium', atomicNumber: 64, category: 'Lanthanide' },
  { symbol: 'Tb', name: 'Terbium', atomicNumber: 65, category: 'Lanthanide' },
  { symbol: 'Dy', name: 'Dysprosium', atomicNumber: 66, category: 'Lanthanide' },
  { symbol: 'Ho', name: 'Holmium', atomicNumber: 67, category: 'Lanthanide' },
  { symbol: 'Er', name: 'Erbium', atomicNumber: 68, category: 'Lanthanide' },
  { symbol: 'Tm', name: 'Thulium', atomicNumber: 69, category: 'Lanthanide' },
  { symbol: 'Yb', name: 'Ytterbium', atomicNumber: 70, category: 'Lanthanide' },
  { symbol: 'Lu', name: 'Lutetium', atomicNumber: 71, category: 'Lanthanide' },
  { symbol: 'Hf', name: 'Hafnium', atomicNumber: 72, category: 'Transition Metal' },
  { symbol: 'Ta', name: 'Tantalum', atomicNumber: 73, category: 'Transition Metal' },
  { symbol: 'W', name: 'Tungsten', atomicNumber: 74, category: 'Transition Metal' },
  { symbol: 'Re', name: 'Rhenium', atomicNumber: 75, category: 'Transition Metal' },
  { symbol: 'Os', name: 'Osmium', atomicNumber: 76, category: 'Transition Metal' },
  { symbol: 'Ir', name: 'Iridium', atomicNumber: 77, category: 'Transition Metal' },
  { symbol: 'Pt', name: 'Platinum', atomicNumber: 78, category: 'Transition Metal' },
  { symbol: 'Au', name: 'Gold', atomicNumber: 79, category: 'Transition Metal' },
  { symbol: 'Hg', name: 'Mercury', atomicNumber: 80, category: 'Transition Metal' },
  { symbol: 'Tl', name: 'Thallium', atomicNumber: 81, category: 'Post-Transition Metal' },
  { symbol: 'Pb', name: 'Lead', atomicNumber: 82, category: 'Post-Transition Metal' },
  { symbol: 'Bi', name: 'Bismuth', atomicNumber: 83, category: 'Post-Transition Metal' },
  { symbol: 'Po', name: 'Polonium', atomicNumber: 84, category: 'Post-Transition Metal' },
  { symbol: 'At', name: 'Astatine', atomicNumber: 85, category: 'Halogen' },
  { symbol: 'Rn', name: 'Radon', atomicNumber: 86, category: 'Noble Gas' },
  { symbol: 'Fr', name: 'Francium', atomicNumber: 87, category: 'Alkali Metal' },
  { symbol: 'Ra', name: 'Radium', atomicNumber: 88, category: 'Alkaline Earth Metal' },
  { symbol: 'Ac', name: 'Actinium', atomicNumber: 89, category: 'Actinide' },
  { symbol: 'Th', name: 'Thorium', atomicNumber: 90, category: 'Actinide' },
  { symbol: 'Pa', name: 'Protactinium', atomicNumber: 91, category: 'Actinide' },
  { symbol: 'U', name: 'Uranium', atomicNumber: 92, category: 'Actinide' },
  { symbol: 'Np', name: 'Neptunium', atomicNumber: 93, category: 'Actinide' },
  { symbol: 'Pu', name: 'Plutonium', atomicNumber: 94, category: 'Actinide' },
  { symbol: 'Am', name: 'Americium', atomicNumber: 95, category: 'Actinide' },
  { symbol: 'Cm', name: 'Curium', atomicNumber: 96, category: 'Actinide' },
  { symbol: 'Bk', name: 'Berkelium', atomicNumber: 97, category: 'Actinide' },
  { symbol: 'Cf', name: 'Californium', atomicNumber: 98, category: 'Actinide' },
  { symbol: 'Es', name: 'Einsteinium', atomicNumber: 99, category: 'Actinide' },
  { symbol: 'Fm', name: 'Fermium', atomicNumber: 100, category: 'Actinide' },
  { symbol: 'Md', name: 'Mendelevium', atomicNumber: 101, category: 'Actinide' },
  { symbol: 'No', name: 'Nobelium', atomicNumber: 102, category: 'Actinide' },
  { symbol: 'Lr', name: 'Lawrencium', atomicNumber: 103, category: 'Actinide' },
  { symbol: 'Rf', name: 'Rutherfordium', atomicNumber: 104, category: 'Transition Metal' },
  { symbol: 'Db', name: 'Dubnium', atomicNumber: 105, category: 'Transition Metal' },
  { symbol: 'Sg', name: 'Seaborgium', atomicNumber: 106, category: 'Transition Metal' },
  { symbol: 'Bh', name: 'Bohrium', atomicNumber: 107, category: 'Transition Metal' },
  { symbol: 'Hs', name: 'Hassium', atomicNumber: 108, category: 'Transition Metal' },
  { symbol: 'Mt', name: 'Meitnerium', atomicNumber: 109, category: 'Unknown' },
  { symbol: 'Ds', name: 'Darmstadtium', atomicNumber: 110, category: 'Unknown' },
  { symbol: 'Rg', name: 'Roentgenium', atomicNumber: 111, category: 'Unknown' },
  { symbol: 'Cn', name: 'Copernicium', atomicNumber: 112, category: 'Unknown' },
  { symbol: 'Nh', name: 'Nihonium', atomicNumber: 113, category: 'Unknown' },
  { symbol: 'Fl', name: 'Flerovium', atomicNumber: 114, category: 'Unknown' },
  { symbol: 'Mc', name: 'Moscovium', atomicNumber: 115, category: 'Unknown' },
  { symbol: 'Lv', name: 'Livermorium', atomicNumber: 116, category: 'Unknown' },
  { symbol: 'Ts', name: 'Tennessine', atomicNumber: 117, category: 'Unknown' },
  { symbol: 'Og', name: 'Oganesson', atomicNumber: 118, category: 'Unknown' },
];

// Color combinations for cards (front color, back color)
const colorPairs = [
  ['#60a5fa', '#93c5fd'], // Blue
  ['#34d399', '#6ee7b7'], // Green
  ['#f472b6', '#f9a8d4'], // Pink
  ['#a78bfa', '#c4b5fd'], // Purple
  ['#fbbf24', '#fcd34d'], // Yellow
  ['#f87171', '#fca5a5'], // Red
  ['#2dd4bf', '#5eead4'], // Teal
  ['#fb923c', '#fdba74'], // Orange
  ['#818cf8', '#a5b4fc'], // Indigo
  ['#f472b6', '#f9a8d4'], // Rose
];

const SPLASH_TITLE = "Periodic Table Flash Cards";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [currentElement, setCurrentElement] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [flipAnim] = useState(new Animated.Value(0));
  const fadeAnim = useState(new Animated.Value(0))[0];
  const scaleAnim = useState(new Animated.Value(0.3))[0];
  const titleAnimations = SPLASH_TITLE.split('').map(() => new Animated.Value(0));
  const [currentColorPair, setCurrentColorPair] = useState(colorPairs[0]);

  useEffect(() => {
    // Animate the splash screen
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        tension: 40,
        useNativeDriver: true,
      }),
      // Animate each letter of the title sequentially
      ...titleAnimations.map((anim, index) =>
        Animated.timing(anim, {
          toValue: 1,
          duration: 200,
          delay: index * 100,
          useNativeDriver: true,
        })
      ),
    ]).start();

    // Hide splash screen after 5 seconds
    const timer = setTimeout(() => {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 0.3,
          friction: 4,
          tension: 40,
          useNativeDriver: true,
        }),
      ]).start(() => setShowSplash(false));
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const renderAnimatedTitle = () => {
    return (
      <View style={styles.titleContainer}>
        {SPLASH_TITLE.split('').map((letter, index) => (
          <Animated.Text
            key={index}
            style={[
              styles.splashTitleLetter,
              {
                opacity: titleAnimations[index],
                transform: [
                  {
                    translateY: titleAnimations[index].interpolate({
                      inputRange: [0, 1],
                      outputRange: [20, 0],
                    }),
                  },
                  {
                    scale: titleAnimations[index].interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.5, 1],
                    }),
                  },
                ],
              },
            ]}
          >
            {letter}
          </Animated.Text>
        ))}
      </View>
    );
  };

  const flipCard = () => {
    setIsFlipped(!isFlipped);
    Animated.spring(flipAnim, {
      toValue: isFlipped ? 0 : 1,
      friction: 8,
      tension: 10,
      useNativeDriver: true,
    }).start();
  };

  const nextCard = () => {
    setIsFlipped(false);
    flipAnim.setValue(0);
    // Generate a random index different from the current one
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * elements.length);
    } while (newIndex === currentElement);
    setCurrentElement(newIndex);
    
    // Set new random color pair
    const newColorIndex = Math.floor(Math.random() * colorPairs.length);
    setCurrentColorPair(colorPairs[newColorIndex]);
  };

  const frontAnimatedStyle = {
    transform: [
      {
        rotateY: flipAnim.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '180deg'],
        }),
      },
    ],
  };

  const backAnimatedStyle = {
    transform: [
      {
        rotateY: flipAnim.interpolate({
          inputRange: [0, 1],
          outputRange: ['180deg', '360deg'],
        }),
      },
    ],
  };

  if (showSplash) {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Animated.View
          style={[
            styles.splashContainer,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          {renderAnimatedTitle()}
          <Text style={styles.developer}>Developed by MeDevRob</Text>
          <Image
            source={{ uri: 'https://cdn4.iconfinder.com/data/icons/logos-brands-5/24/react-512.png' }}
            style={styles.logo}
          />
          <Animated.View style={[styles.loadingDot, { opacity: fadeAnim }]} />
        </Animated.View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.title}>Periodic Table Flash Cards</Text>
      
      <View style={styles.cardContainer}>
        <Animated.View 
          style={[
            styles.card, 
            { backgroundColor: currentColorPair[0] },
            styles.cardFront, 
            frontAnimatedStyle
          ]}
        >
          <Text style={styles.symbol}>{elements[currentElement].symbol}</Text>
          <Text style={styles.atomicNumber}>{elements[currentElement].atomicNumber}</Text>
        </Animated.View>
        
        <Animated.View 
          style={[
            styles.card,
            { backgroundColor: currentColorPair[1] },
            styles.cardBack,
            backAnimatedStyle
          ]}
        >
          <Text style={styles.elementName}>{elements[currentElement].name}</Text>
          <Text style={styles.category}>{elements[currentElement].category}</Text>
        </Animated.View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.button, { backgroundColor: currentColorPair[0] }]} 
          onPress={flipCard}
        >
          <Text style={styles.buttonText}>Flip Card</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.button, { backgroundColor: currentColorPair[0] }]} 
          onPress={nextCard}
        >
          <Text style={styles.buttonText}>Next Card</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f9ff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  splashContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    maxWidth: 300,
    marginBottom: 20,
  },
  logo: {
    width: 80,
    height: 80,
    marginTop: 20,
  },
  splashTitleLetter: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2563eb',
    marginHorizontal: 2,
  },
  developer: {
    fontSize: 20,
    color: '#4b5563',
    marginTop: 10,
    fontWeight: '600',
  },
  loadingDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#2563eb',
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2563eb',
    marginBottom: 30,
  },
  cardContainer: {
    width: 280,
    height: 400,
    marginVertical: 20,
  },
  card: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backfaceVisibility: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardFront: {
  },
  cardBack: {
  },
  symbol: {
    fontSize: 80,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  atomicNumber: {
    fontSize: 24,
    color: '#ffffff',
    position: 'absolute',
    top: 20,
    left: 20,
  },
  elementName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 10,
  },
  category: {
    fontSize: 24,
    color: '#ffffff',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 20,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    minWidth: 120,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
