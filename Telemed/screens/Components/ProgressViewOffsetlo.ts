import React, { useState ,useEffect,useRef} from 'react'
import { useNavigation} from '@react-navigation/native'
import { Platform } from 'react-native';
import { StackActions,CommonActions } from '@react-navigation/native'



const selectHook = <T,>({
    useDefault,
    useAndroid,
}: {
    useDefault: T;
    useAndroid: T;
}) => {
    return Platform.select({
        default: useDefault,
        android: useAndroid,
    });
};


const useProgressViewOffset1 = selectHook({
    
    useDefault: (offset?: number) => offset,
    useAndroid: (offset?: number) => {
        const navigation = useNavigation();
        const [progressViewOffset, setProgressViewOffset] = useState(offset);
        const goBackEventWasHandled = useRef(false);
        const goBack=useRef(false);

        // prevent the navigation event and hide the refresh indicator
        React.useEffect(() => {
            const unsubscribe = navigation.addListener('beforeRemove', (event) => {
                // Handle GO_BACK event only, because it fits my use case, please tweak it to fit yours
                if (
                    event.data.action.type === 'RESET' &&
                    !goBackEventWasHandled.current
                )
                
              
                 {
                    event.preventDefault();
                    goBackEventWasHandled.current = true;
                    setProgressViewOffset(-1000); // set to a ridiculous value to hide the refresh control
                }
                else if (
                    event.data.action.type === 'GO_BACK' &&
                    !goBack.current
                )
                {
                    event.preventDefault();
                    goBack.current = true;
                    setProgressViewOffset(-1000); // set to a ridiculous value to hide the refresh control
                }
            });

            return unsubscribe;
        }, [navigation]);

        // perform the navigation with the hidden refresh indicator
        React.useEffect(() => {
            if (progressViewOffset !== undefined && goBackEventWasHandled.current) {
                navigation.dispatch(
                    CommonActions.reset({
                        index: 1,
                        routes: [
                          { name: 'Login' },
                         
                        ],
                      })
                    
                );
               
            }

            else if(progressViewOffset !== undefined && goBack.current){
                navigation.goBack();

            }
        }, [navigation, progressViewOffset]);

        return progressViewOffset;
    },

    // No need to do anything on iOS

});
export default useProgressViewOffset1;