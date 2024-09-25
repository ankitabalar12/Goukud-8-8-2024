import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { styles } from './styles'

const TempleAdmin = () => {
    const [searchQuery, setSearchQuery] = useState('');
    return (
        <View style={styles.container}>
            <View style={styles.flexrowview}>
                <TouchableOpacity>
                    <Image source={require('../../../assets/images/notificationicon.png')} style={styles.notification}></Image>
                </TouchableOpacity>
                <Text style={styles.goundertextstyle}>Gounder Kudumbam</Text>
                <TouchableOpacity>
                    <Image source={require('../../../assets/images/iconsearch.png')} style={styles.notification}></Image>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.sreachview}>
                <View style={styles.flexviewrowsreach}>
                <Image source={require('../../../assets/images/iconsearch.png')} style={styles.iconsearchicon}></Image>
             <TextInput
                    style={styles.searchInput}
                    placeholder="Search"
                    value={searchQuery}
                    onChangeText={text => setSearchQuery(text)}
                />
                </View>
            </TouchableOpacity>
            <Text style={styles.templead}>Temple Admin</Text>
            <View style={styles.detailsview}>
                <View style={styles.fleximagesview}>
                    <View style={styles.imgview}>
                    <Image source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLe5PABjXc17cjIMOibECLM7ppDwMmiDg6Dw&s'}} style={styles.fullimg}></Image>
                    </View>
                    <View style={styles.cloumetext}>
                    <Text style={styles.textstyle}>Marimuthu</Text>
                    <Text style={styles.textstyle2}>Koorai Kulam</Text>
                    </View>
                    <TouchableOpacity style={styles.callside}>
                    <Image source={require('../../../assets/images/materialsymbolscall.png')} style={styles.materialsymboligm}></Image>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.detailsview}>
                <View style={styles.fleximagesview}>
                    <View style={styles.imgview}>
                    <Image source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLe5PABjXc17cjIMOibECLM7ppDwMmiDg6Dw&s'}} style={styles.fullimg}></Image>
                    </View>
                    <View style={styles.cloumetext}>
                    <Text style={styles.textstyle}>Marimuthu</Text>
                    <Text style={styles.textstyle2}>Koorai Kulam</Text>
                    </View>
                    <TouchableOpacity style={styles.callside}>
                    <Image source={require('../../../assets/images/materialsymbolscall.png')} style={styles.materialsymboligm}></Image>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.detailsview}>
                <View style={styles.fleximagesview}>
                    <View style={styles.imgview}>
                    <Image source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLe5PABjXc17cjIMOibECLM7ppDwMmiDg6Dw&s'}} style={styles.fullimg}></Image>
                    </View>
                    <View style={styles.cloumetext}>
                    <Text style={styles.textstyle}>Marimuthu</Text>
                    <Text style={styles.textstyle2}>Koorai Kulam</Text>
                    </View>
                    <TouchableOpacity style={styles.callside}>
                    <Image source={require('../../../assets/images/materialsymbolscall.png')} style={styles.materialsymboligm}></Image>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.detailsview}>
                <View style={styles.fleximagesview}>
                    <View style={styles.imgview}>
                    <Image source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLe5PABjXc17cjIMOibECLM7ppDwMmiDg6Dw&s'}} style={styles.fullimg}></Image>
                    </View>
                    <View style={styles.cloumetext}>
                    <Text style={styles.textstyle}>Marimuthu</Text>
                    <Text style={styles.textstyle2}>Koorai Kulam</Text>
                    </View>
                    <TouchableOpacity style={styles.callside}>
                    <Image source={require('../../../assets/images/materialsymbolscall.png')} style={styles.materialsymboligm}></Image>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default TempleAdmin

