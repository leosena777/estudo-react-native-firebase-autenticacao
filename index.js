import firebase from 'firebase';
import React, { Component } from 'react';
import {
  AppRegistry, View, Alert, Button
} from 'react-native';
import { name as appName } from './app.json';

class App extends Component {
  componentWillMount() {
    const firebaseConfig = {
      apiKey: 'AIzaSyBl3uclQl7Hm5vFrE332msUYQbHQQ48-zI',
      authDomain: 'projeto-teste-reactnative.firebaseapp.com',
      databaseURL: 'https://projeto-teste-reactnative.firebaseio.com',
      projectId: 'projeto-teste-reactnative',
      storageBucket: 'projeto-teste-reactnative.appspot.com',
      messagingSenderId: '1028732368439',
      appId: '1:1028732368439:web:85e864c3b3e8779f'
    };
    firebase.initializeApp(firebaseConfig);

    firebase.auth().onAuthStateChanged((usuarioAtual) => {
      if (usuarioAtual) {
        Alert.alert('Sucesso!', 'Usuario Logado');
      } else {
        Alert.alert('Erro!', 'Usuario nao esta logado');
      }
    });
  }

  cadastrarUsuario() {
    const email = 'leandro@gmail.com';
    const senha = '123456';

    const usuario = firebase.auth();
    usuario.createUserWithEmailAndPassword(email, senha).catch((erro) => {
      let messageErro = '';

      switch (erro.code) {
        case 'auth/email-already-in-use':
          messageErro = 'Email ja existente';
          break;
        case 'auth/invalid-email':
          messageErro = 'email invalido';
          break;
        case 'auth/operation-not-allowed':
          messageErro = 'Erro ao processar email e senha';
          break;
        case 'auth/weak-password':
          messageErro = 'Sua senha e fraca, tente uma nova senha';
          break;
        default:
          messageErro = 'nao foi possivel realizar a operacao!';
      }

      Alert.alert('Erro!', messageErro);
    });
  }

  deslogarUsuario() {
    const usuario = firebase.auth();
    usuario.signOut();
  }

  verificarUsuarioLogado() {
    const usuario = firebase.auth();
    const usuarioAtual = usuario.currentUser;
    if (usuarioAtual) {
      Alert.alert('Sucesso!', 'Usuario Logado');
    } else {
      Alert.alert('Erro!', 'Usuario nao esta logado');
    }
  }

  logarUsuario() {
    const email = 'leandro@gmail.com';
    const senha = '123456';

    const usuario = firebase.auth();
    usuario.signInWithEmailAndPassword(email, senha).catch((erro) => {
      let messageErro = '';

      switch (erro.code) {
        case 'auth/invalid-email':
          messageErro = 'Email invalido';
          break;
        case 'auth/user-disabled':
          messageErro = 'usuario desabilitado';
          break;
        case 'auth/user-not-found':
          messageErro = 'usuario nao existe';
          break;
        case 'auth/wrong-password':
          messageErro = 'Senha errada';
          break;
        default:
          messageErro = 'nao foi possivel realizar a operacao!';
      }

      Alert.alert('Erro!', messageErro);
    });
  }

  render() {
    return (
      <View>
        <View>
          <Button
            onPress={() => {
              this.cadastrarUsuario();
            }}
            title="Cadastrar usuario"
            color="#841584"
            accessibilityLabel="Cadastrar usuario"
          />
          <Button
            onPress={() => {
              this.verificarUsuarioLogado();
            }}
            title="Verifica usuario"
            color="#841584"
            accessibilityLabel="Verifica usuario logado"
          />
          <Button
            onPress={() => {
              this.deslogarUsuario();
            }}
            title="Deslogar usuario"
            color="#841584"
            accessibilityLabel="Deslogar usuario"
          />
          <Button
            onPress={() => {
              this.logarUsuario();
            }}
            title="Logar usuario"
            color="#841584"
            accessibilityLabel="Logar usuario"
          />
        </View>
      </View>
    );
  }
}

AppRegistry.registerComponent(appName, () => App);

/* const firebaseConfig = {
      apiKey: '<API_KEY>',
      authDomain: '<PROJECT_ID>.firebaseapp.com',
      databaseURL: 'https://<DATABASE_NAME>.firebaseio.com',
      projectId: '<PROJECT_ID>',
      storageBucket: '<BUCKET>.appspot.com',
      messagingSenderId: '<SENDER_ID>'
    };
    */
