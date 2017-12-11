import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { connect } from 'react-redux'
import { Header, CardSection } from '../components/common'
import { Card, Button } from 'react-native-elements'
import { MapView } from 'expo'
import * as actions from '../actions'

class DeckScreen extends Component {
    static navigationOptions = {
        tabBarLabel: 'Places List'
    }
    onButtonPress(job) {
        this.props.likeJob(job)
    }
    renderJobs() {
        console.log(this.props.jobs)
        return this.props.jobs.results.map((place,index) => {
            console.log(place)
            return (
                <Card key={place.place_id} title={place.name}>
                    <View>
                        <MapView
                        scrollEnabled = {false}
                        style={{ flex: 1, height: 150 }}
                        cacheEnabled
                        initialRegion={{
                            latitude: place.geometry.location.lat,
                            longitude: place.geometry.location.lng,
                            latitudeDelta: 0.045,
                            longitudeDelta: 0.02
                        }}
                        />
                    </View>
                    <View style={styles.detailContainerStyle}>
                        <Text style={styles.textStyle}>{place.name}</Text>
                        
                        
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
