import { WebView } from 'react-native-webview';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Button, useWindowDimensions } from 'react-native';
import { useAssets } from 'expo-asset';

export default function Map(props) {
    const [assets] = useAssets([require('../assets/index.html')]);
    const [htmlString, setHtmlString] = React.useState();

    const dimensions = useWindowDimensions();
    const webViewRef = React.useRef();


    React.useEffect(() => {
        if (assets) {
            fetch(assets[0].localUri || '')
                .then((res) => res.text())
                .then((html) => setHtmlString(html));
        }
    }, [assets]);

    if (!htmlString) { return <></> }

    return (
        <WebView ref={(r) => (webViewRef.current)}
            injectedJavaScript=''
            originWhitelist={['*']}
            source={{
                html: htmlString,
            }}
            javaScriptEnabled
            style={styles.map}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: '100%',
        height: '80%'
    }
})