import { useState, useEffect} from 'react'
import {Text, View, StyleSheet, FlatList} from 'react-native'

async function getUsers(tk){    
    try{        
        const res = await fetch("http://localhost:3000/api/users",{
            method : "GET",
            headers: {
                    "Content-Type" : "application/json",
                    "Authorization" : `Bearer ${tk}`
                    }      
        });

        if(res.ok){
            const result = await res.json();
            return result;
        }
        return false;
    } catch (error) {
        console.error("Erro ao fazer requisição GET na API: ", error);
        return false;
    }
}

const List = ({user}) =>{  
    return(        
        <View style={Style.list}>
            <Text>Nome:{user?.name}</Text>
            <Text>Email:{user?.email}</Text>
        </View>

    )
}

export default function PagInit({navigation, route}){
    const [user,setUser] = useState([]);  
    const [token, setToken] = useState("");
    const{tk} = route.params;    

    useEffect(()=>{      
        handleGetUsers(tk);
    },[tk]);
   

    async function handleGetUsers(tk){
        try {           
            const res  = await getUsers(tk);
            if(res){                
                setUser(res.sucess);
            }else{
                console.warn("não retornou nada : ", res);
            }
        } catch (error) {
            console.error("Erro ao trazer usuarios: ", error);
        }
    }

    return(
        <View style={Style.container}>
            <View style={Style.header}>{/*Cabeçário*/}
                <Text style={{textAlign:'center', fontSize:25}}>Página Inicial</Text>
            </View>
            <View style={Style.body}>{/*Corpo*/}
                <Text style={{fontSize:20, textAlign:'center'}}>Lista de Usuários do sistema</Text>
                <FlatList 
                    data={user}
                    keyExtractor={(item)=>item.id}
                    renderItem={({item})=> <List user={item}/>}
                />
                
            </View>
        </View>
    )
}


const Style = StyleSheet.create({
    container:{ 
        flex:1,       
        alignItems:'center',
        backgroundColor:'#345739'
    },
    header:{
        backgroundColor:'#cccc',
        width:'100%',
        padding:30,
        justifyContent:'center',
    },
    body:{
        marginTop:50,
        width:'90%',
        
    },
    list:{
        marginTop:30,
        backgroundColor:'#cccc',
        borderRadius:5,
        padding:10,
            
    }
})