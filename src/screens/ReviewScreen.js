import React, { Component } from 'react';
import { Text, View, ScrollView, Linking, Image } from 'react-native';
import { connect } from 'react-redux'
import { MapView }from 'expo'
import { Card, Button, Icon } from 'react-native-elements'
import { Header, CardSection } from '../components/common'

class ReviewScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            tabBarIcon: () => (<Icon name='rate-review' size={25} color='black' />),
            title: 'Review Places',
            headerRight: (
            <Button
            title='Settings'
            backgroundColor='rgba(0,0,0,0)'
            color= 'gray'
            onPress={() => navigation.navigate('setting')} />
            
            )
        }
    }
    
    onButtonPress({ place, name, coordinate }) {
        this.props.navigation.navigate('web', { place, name, coordinate })
    }
    renderHeader(place) {
        return (
        <View style={styles.detailContainerStyle}>
            {this.renderOpen(place)}
            <Text>{place.rating === undefined? 'No Rating Data' : place.rating}</Text>
        </View>
        )
    }
    renderOpen(place) {
        if (place.opening_hours === undefined) {
            return <Text>Opening Hour NA</Text>
        }
        if (place.opening_hours.open_now) {
            return <Text>Open</Text>
        }
        return <Text>Closed</Text>
    }
    renderTypes(place) {
        return (
        place.types.map((type, index) => {
            return (
            <Text key={index} style={styles.textStyle}>{type}</Text>
            )
        })
    )
    }
    renderJobs() {
        const JOB_ROOT_URL = 'https://maps.googleapis.com/maps/api/place/photo?'
        // const JOB_QUERY_PARAMS = `publisher=4201738803816157&format=json&l=${l}&v=2&co=ID`
        const JOB_QUERY_PARAMS = {
            key: 'AIzaSyC3A2qW3Hfqj4HF-V0rEmfY3eIvkBw09MI',
            maxheight: 300
        }
        console.log(this.props.jobs)
        return this.props.likedJobs.map((place) => {
            let url = 'https://dummyimage.com/250x250/000/fff&text=No+Image'
            console.log(place)
           if (place.photos !== undefined) {
             url = `https://maps.googleapis.com/maps/api/place/photo?photoreference=${place.photos['0'].photo_reference}&maxheight=250&key=AIzaSyC3A2qW3Hfqj4HF-V0rEmfY3eIvkBw09MI`
           }
            return (
                <Card key={place.place_id} title={place.name}>
                    <View>
                        {this.renderHeader(place)}
                            
                        <Image
                        style={{ flex: 1, height: 250 }}
                        source={{
                            uri: url }}
                        />
                    </View>
                    <View >
                        <Text style={styles.textStyle}>{place.vicinity}</Text>
                        <Text style={styles.textStyle}>Types:</Text>
                        {this.renderTypes(place)}
                        
                        
                   </View>
                   {/* <Text style={{ textAlign: 'justify' , marginBottom: 10}}>{job.snippet.replace(/<b>/g,'').replace(/<\/b>/g,'')}</Text> */}
                        <Button
                        icon={{ name: 'map' }}
                        title='View on Map'
                        backgroundColor='#03A9F4'
                        onPress={this.onButtonPress.bind(this, { place, name: place.name, coordinate: place.geometry.location })}
                        />
                
                
                </Card>
            )
        })
    }
    render() {
        console.log(this.props.jobs)
        
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
            <ScrollView>
                <Header headerText='Places List' />
                
                {this.renderJobs()}
               
            </ScrollView>
            </View>
        )
   }
}
const styles = {
    detailContainerStyle: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10,
        marginTop: 10
    },
    textStyle: {
        fontStyle: 'italic'
    },
    buttonStyle: {
        marginTop: 10,
        alignSelf: 'center',
        justifyContent: 'center'
    }
}
const mapStateToProps = (state) => {
    return {
        likedJobs: state.likedJobs
    }
}
export default connect(mapStateToProps)(ReviewScreen);
