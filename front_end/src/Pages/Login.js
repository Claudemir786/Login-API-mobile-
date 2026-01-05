import{Text,View,StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useState } from 'react';

async function Log(user){
    try{
        const res = await fetch("http://localhost:3000/api/login",{
            method: "POST",
            headers : {"Content-Type" : "application/json"},
            body : JSON.stringify(user)
        })
        if(res.ok){
            
            const result = await res.json();
            console.log(result.token);
            return result.token;
        }
        return false;

    }catch(error){
        console.error("erro ao buscar dados na API: ", error);
        return false;
    }
}

export default function Login({navigation}){
    const [name,setName] = useState("");
    const [password, setpassword] = useState("");
  

   async function handleLogin(){

        if(!name || !password || name.length < 2 || password < 6){
            alert("preencha todos os campos adequadamente");
        }else{

            try{
                const result = await Log({login : name, password: password});            
                if(result){
                    console.log("resultado : ", result);
                    alert("Login efetuado com sucesso");                    
                    navigation.navigate("Init", {tk : result});
                }else{
                    alert("usuario invalido");
                }               
           
            }catch(error){
                console.error("erro ao fazer login: ", error);
                alert("erro ao fazer login");
            }           
        }        
    }

    return(
        <View style={Style.container}>
            <View style={Style.card}>{/*card*/}
                <View style={Style.logo}>{/*Logo*/}
                    <AntDesign name="html5" size={80} color="#C7D1C7" />
                </View>
                <View style={Style.inputs}>{/*Campos + botões*/}

                    <TextInput 
                    placeholder='UserName' 
                    style={Style.TextInput}
                    value={name}
                    onChangeText={setName}
                    />
                    <TextInput 
                    placeholder='Password' 
                    style={Style.TextInput} 
                    value={password}
                    onChangeText={setpassword}
                    secureTextEntry/>

                   <TouchableOpacity style={Style.button} onPress={()=>handleLogin()}>
                        <Text style={{textAlign:'center', fontSize:20}}>LOGIN</Text>
                   </TouchableOpacity>
                   <Text style={{fontSize:15, color:'#CCCCCC', textAlign:'center'}}>Forgot your Password?</Text>
                </View>

                <View>{/*botão de se inscrever*/}
                    <TouchableOpacity style={Style.buttonOpaccitty}>
                        <Text style={{color:'#CCCCCC', fontSize:20}}>SING UP</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const Style = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#345739',
    },
    card:{
        justifyContent:'center',
        alignItems:'center',
        marginTop:100,
    },
    logo:{
        marginBottom:70,

    },
    inputs:{        
        width:'65%',
    },
    TextInput:{
        borderBottomWidth:1,
        borderColor:'#C7D1C7',
        color:'#C7D1C7',
        textAlign:'center',
        padding:10,
        marginBottom:30,

    },
    button:{
        alignSelf:'center',
        backgroundColor:'#CCCCCC',
        width:'100%',
        borderRadius:10,
        padding:12,
        marginBottom:20
    

    },
    buttonOpaccitty:{
        backgroundColor:'#345739',
        marginTop:60

        

    }

})