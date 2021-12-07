import React, {useEffect, useRef, useState} from 'react';
import {Button, StyleSheet, Vibration} from 'react-native';
import {RNCamera} from 'react-native-camera';
import QRCodeScanner from 'react-native-qrcode-scanner';

const Scanner = ({token, setToken}) => {
  const cameraRef = useRef();
  const [enReScan, setEnReScan] = useState(false);
  useEffect(() => {
    cameraRef.current.reactivate();
  }, []);
  const onSuccess = e => {
    setEnReScan(true);
    Vibration.vibrate();
    fetch('https://qr-server-191.herokuapp.com/scanPerson', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        qr: e.data,
        token: token,
      }),
    })
      .then(res => res.json())
      .then(result => {
        if (result.success) {
          alert('success');
        } else {
          alert(result.message);
        }
      });
  };
  return (
    <>
      <QRCodeScanner
        ref={cameraRef}
        onRead={onSuccess}
        flashMode={RNCamera.Constants.FlashMode.torch}
      />
      {enReScan && (
        <Button
          onPress={() => {
            setEnReScan(false);
            cameraRef.current.reactivate();
          }}
          title="ReScan"
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    padding: 16,
    right: 0,
    left: 0,
    alignItems: 'center',
  },
  topOverlay: {
    top: 0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomOverlay: {
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  enterBarcodeManualButton: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 40,
  },
  scanScreenMessage: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default Scanner;
