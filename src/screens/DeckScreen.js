import React, { Component } from 'react';
import qs from 'qs'
import { Text, View, ScrollView, Image } from 'react-native';
import { connect } from 'react-redux'
import { Header, CardSection } from '../components/common'
import { Card, Button, Icon } from 'react-native-elements'
import { MapView } from 'expo'
import * as actions from '../actions'

class DeckScreen extends Component {
    static navigationOptions = {
        tabBarIcon: () => (<Icon name='view-list' size={25} color='black' />),
        tabBarLabel: 'Places List'
    }       

    onButtonPress(job) {
        this.props.likeJob(job)
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
        return this.props.jobs.results.map((place, index) => {
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
                        
                        title='Like This Place'
                        backgroundColor='#03A9F4'
                        onPress={this.onButtonPress.bind(this, place)}
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
        jobs: state.jobs
    }
}
export default connect(mapStateToProps, actions)(DeckScreen);
