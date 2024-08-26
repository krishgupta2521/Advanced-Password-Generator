import {
  Clipboard,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
  Image,
  Alert,
  Switch,
} from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

type modeData = {
	[key: string]: string
}

type RootStackParamList = {
  Home: undefined;
  History: {modeData: modeData};
};

type DataItem = {
  id: string;
  val: string | null;
};

type LoopData = {
    [key: number]: { c: number; s: number; n: number };
}

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
type HistoryScreenProps = NativeStackScreenProps<RootStackParamList, 'History'>;

var keyVal = 1;

function HomeScreen({navigation}: HomeScreenProps): JSX.Element {
	const [passLength, passFunction] = React.useState<number>(0);
	const [passResult, passResultFunction] = React.useState('');
	const [copyMsg, copyMsgFunction] = React.useState('');
	const [globalPass, setglobalPass] = React.useState('');
	const [prevGlobalPass, setPrevGlobalPass] = React.useState('');
	const [showSaveBtn, setShowSaveBtn] = React.useState(false);
	const [isEnabled, setIsEnabled] = React.useState(true);

	React.useEffect(() => {
		const check = async () => {
			const isDarkMode = await AsyncStorage.getItem('isDarkModeEnabled');
			if (isDarkMode === 'false') {
				setIsEnabled(false);
			}
			else {
				setIsEnabled(true);
			}
		}
		check();
	}, []);

	const generate = () => {
		if (isNaN(passLength) || passLength < 8) {
			passResultFunction('Minimum length is 8...');
			return;
		} else if (passLength > 16) {
			passResultFunction('Maximum length is 16...');
			return;
		}

		const loopData: LoopData = {
			8: {
				c: 5,
				s: 1,
				n: 2
			},
			9: {
				c: 5,
				s: 1,
				n: 3
			},
			10: {
				c: 5,
				s: 1,
				n: 4
			},
			11: {
				c: 5,
				s: 2,
				n: 4
			},
			12: {
				c: 6,
				s: 2,
				n: 4
			},
			13: {
				c: 6,
				s: 2,
				n: 5
			},
			14: {
				c: 7,
				s: 2,
				n: 5
			},
			15: {
				c: 7,
				s: 3,
				n: 5
			},
			16: {
				c: 7,
				s: 4,
				n: 5
			}
		}

		const allChar = 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz';
		const allSpecialChar = '~!@#$%^&*=';
		const allNum = '0123456789';

		const allCharArray = allChar.split('');
		const allSpecialCharArray = allSpecialChar.split('');
		const allNumArray = allNum.split('');

		let pass = '';

		if (loopData[passLength]) {
			for (let i = 0; i < loopData[passLength].c; i++) {
				pass += allCharArray[Math.floor(Math.random() * allChar.length)];
			}
			for (let i = 0; i < loopData[passLength].s; i++) {
				pass += allSpecialCharArray[Math.floor(Math.random() * allSpecialChar.length)];
			}
			for (let i = 0; i < loopData[passLength].n; i++) {
				pass += allNumArray[Math.floor(Math.random() * allNum.length)];
			}

			passResultFunction(pass);
			setglobalPass(pass);
			setShowSaveBtn(true);
			copyMsgFunction(' (Tap to copy)');
		}
	};

	const copyResult = async () => {
		if (globalPass.length > 7) {
			Clipboard.setString(globalPass);
			ToastAndroid.show('Copied successfully...', ToastAndroid.SHORT);
		};
	};

	const saveFun = async () => {
		if (prevGlobalPass != globalPass) {
			await AsyncStorage.setItem(`value_${keyVal}`, globalPass);
			keyVal += 1;
			ToastAndroid.show('Saved successfully...', ToastAndroid.SHORT);
			setPrevGlobalPass(globalPass);
		} else {
			ToastAndroid.show('Already saved in history...', ToastAndroid.SHORT);
		}
	};

	const toggleSwitch = async () => {
		setIsEnabled(!isEnabled);
		await AsyncStorage.setItem('isDarkModeEnabled', `${!isEnabled}`);
	};

	let modeData: modeData = {
		bgColor: isEnabled ? '#1A1F24' : '#FFFFFF',
		txtColor: isEnabled ? '#FFFFFF' : '#000000',
		inputBgColor: isEnabled ? '#22282F' : '#F9F6EE',
		cardBgColor: isEnabled ? '#101213' : '#FAF9F6'
	};

	return (
    <SafeAreaView
      style={[styles.safeArea, {backgroundColor: modeData.bgColor}]}>
      <ScrollView>
        <View style={styles.container}>
          <Text style={[styles.heading, {color: modeData.txtColor}]}>
            Password Generator
          </Text>
          <TextInput
            style={[styles.inputBox, {backgroundColor: modeData.inputBgColor, color: modeData.txtColor}]}
            keyboardType="numeric"
            placeholder="Password length..."
            placeholderTextColor={isEnabled ? '#95A1AC' : '#22282F'}
            onChangeText={value => {
              passFunction(parseInt(value));
              passResultFunction('');
              copyMsgFunction('');
              setShowSaveBtn(false);
            }}
          />
          <View style={[styles.rowStyle, {marginTop: '5%'}]}>
            <Text style={{fontSize: 18, color: modeData.txtColor}}>
              Dark Mode
            </Text>
            <Switch
              trackColor={{false: '#95A1AC', true: '#95A1AC'}}
              thumbColor={isEnabled ? '#452C74' : '#FFFFFF'}
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
          <View style={[styles.rowStyle, styles.actionBox]}>
            <TouchableOpacity style={styles.button} onPress={generate}>
              <Text style={styles.text}>Generate</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                navigation.navigate('History', {
                  modeData,
                })
              }>
              <Text style={styles.text}>History</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={[styles.columnStyle, styles.resultBox]}
            onPress={copyResult}>
            <View style={styles.rowStyle}>
              <Text style={[styles.resultStyle, {color: modeData.txtColor}]}>
                {passResult}
              </Text>
              <Text style={[styles.copyStyle, {color: modeData.txtColor}]}>
                {copyMsg}
              </Text>
            </View>
            <View style={styles.rowStyle}>
              {showSaveBtn && (
                <TouchableOpacity style={styles.button} onPress={saveFun}>
                  <Text style={styles.text}>Save</Text>
                </TouchableOpacity>
              )}
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function HistoryScreen({navigation, route}: HistoryScreenProps): JSX.Element {
	const [allData, setAllData] = React.useState<DataItem[]>([]);
	let modeData = route.params.modeData;

  const copyPass = (passToCopy: string | null) => {
	if (passToCopy) {
	  Clipboard.setString(passToCopy);
	  ToastAndroid.show('Copied successfully...', ToastAndroid.SHORT);
	}
  };

  const deleteCard = async (id: string | null) => {
	if (id) {
	  Alert.alert(
		'Deletion confirmation',
		'Are you sure you want to delete it ?',
		[
		  {
			text: 'Yes',
			style: 'default',
			onPress: async () => {
			  keyVal = 1;
			  await AsyncStorage.removeItem(id);
			  setAllData([]);
			  ToastAndroid.show('Deleted successfully...', ToastAndroid.SHORT);
			},
		  },
		  {
			text: 'Cancel',
			style: 'cancel',
		  },
		],
	  );
	}
  };

  const deleteAll = async () => {
	if (allData.length > 0) {
	  Alert.alert(
		'Deletion confirmation',
		'Are you sure you want to delete all ?',
		[
		  {
			text: 'Yes',
			style: 'default',
			onPress: async () => {
			  keyVal = 1;
			  await AsyncStorage.clear();
			  setAllData([]);
			  ToastAndroid.show(
				'Deleted all passwords successfully...',
				ToastAndroid.SHORT,
			  );
			},
		  },
		  {
			text: 'Cancel',
			style: 'cancel',
		  },
		],
	  );
	} else {
	  ToastAndroid.show('Nothing to clear.', ToastAndroid.SHORT);
	}
  };

  React.useEffect(() => {
	const loadItems = async () => {
	  const storedKeys = await AsyncStorage.getAllKeys();
	  const storedValues = await AsyncStorage.multiGet(storedKeys);
	  const keyValuePair = storedValues
      .filter(([key, value]) => key !== 'isDarkModeEnabled')
      .map(([key, value]) => ({
        id: key,
        val: value,
      }));
	  setAllData(keyValuePair);
	};
	loadItems();
  }, [allData]);

  const renderCards = () => {
	if (allData.length > 0) {
	  return allData.map(({id, val}) => (
      <View style={[styles.card, {backgroundColor: modeData.cardBgColor}]}>
        <View style={[styles.rowStyle, styles.delViewStyle]}>
          <Text style={[styles.delViewText, {color: modeData.txtColor}]}>
            (Tap to copy)
          </Text>
          <TouchableOpacity id={id} onPress={() => deleteCard(id)}>
            <Image
              source={
                modeData.txtColor === '#FFFFFF'
                  ? require('./assets/light-delete-icon.png')
                  : require('./assets/dark-delete-icon.png')
              }
              style={styles.deleteIcon}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            height: 1,
            backgroundColor: modeData.txtColor,
            marginTop: '2%',
          }}
        />
        <TouchableOpacity
          style={styles.contentViewStyle}
          onPress={() => copyPass(val)}>
          <Text style={{color: modeData.txtColor}}>{val}</Text>
        </TouchableOpacity>
      </View>
    ));
	} else {
	  return (
		<View>
		  <Text style={[styles.resultStyle, {color: modeData.txtColor}]}>No History :(</Text>
		</View>
	  );
	}
  };

  return (
    <SafeAreaView style={[styles.safeArea, {backgroundColor: modeData.bgColor}]}>
      <ScrollView>
        <View style={styles.container}>
          <Text style={[styles.heading, {color: modeData.txtColor}]}>
            History
          </Text>
          <View style={styles.rowStyle}>
            <TouchableOpacity style={styles.button} onPress={deleteAll}>
              <Text style={styles.text}>Clear All</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.goBack()}>
              <Text style={styles.text}>Go Back</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.rowStyle, styles.cardsContainer]}>
            {renderCards()}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App(): JSX.Element {
	return (
		<NavigationContainer>
			<Stack.Navigator
			initialRouteName="Home"
			screenOptions={{headerShown: false}}>
				<Stack.Screen name="Home" component={HomeScreen} />
				<Stack.Screen name="History" component={HistoryScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	safeArea: {
		flex: 1
	},
	container: {
		alignItems: 'center',
	},
	heading: {
		fontSize: 26,
		fontWeight: 'bold',
		textDecorationLine: 'underline',
		marginTop: '5%',
	},
	resultStyle: {
		fontSize: 24,
		marginTop: '5%',
	},
	text: {
		color: '#FFFFFF',
	},
	inputBox: {
		height: 50,
		width: 200,
		marginTop: '5%',
		alignItems: 'flex-start',
		justifyContent: 'center',
		borderRadius: 50,
		paddingStart: 15,
	},
	button: {
		backgroundColor: '#452C74',
		height: 40,
		width: 100,
		borderRadius: 20,
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: '5%',
		marginHorizontal: 10,
	},
	resultBox: {
		alignItems: 'center',
	},
	columnStyle: {
		flex: 1,
		flexDirection: 'column',
	},
	rowStyle: {
		flex: 1,
		flexDirection: 'row',
	},
	actionBox: {
		justifyContent: 'space-evenly',
	},
	copyStyle: {
		fontSize: 15,
		marginTop: '7%',
		fontFamily: 'monospace',
	},
	cardsContainer: {
		marginTop: '5%',
		flexWrap: 'wrap',
		justifyContent: 'space-between'
	},
	card: {
		height: 100,
		width: '47%',
		borderRadius: 20,
		padding: 5,
		margin: 5,
		justifyContent: 'space-between',
	},
	delViewStyle: {
		justifyContent: 'space-between',
	},
	contentViewStyle: {
		flex: 3,
		justifyContent: 'center',
		alignItems: 'center',
	},
	deleteIcon: {
		height: 25,
		width: 25,
	},
	delViewText: {
		fontFamily: 'monospace',
	}
});
