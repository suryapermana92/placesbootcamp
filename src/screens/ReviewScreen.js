import React, { Component } from 'react';
import { Text, View, ScrollView, Linking } from 'react-native';
import { connect } from 'react-redux'
import { MapView }from 'expo'
import { Card, Button } from 'react-native-elements'
import { Header, CardSection } from '../components/common'

class ReviewScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
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
    
    onButtonPress(url) {
        this.props.navigation.navigate('web', { url })
    }
    renderJobs() {
        console.log(this.props.likedJobs)
        return this.props.likedJobs.map((job,index) => {
            return (
                <Card key={index} title={job.jobtitle}>
                    <View>
                        <MapView
                        scrollEnabled = {false}
                        style={{ flex: 1, height: 150 }}
                        cacheEnabled
                        initialRegion={{
                            latitude: job.latitude,
                            longitude: job.longitude,
                            latitudeDelta: 0.045,
                            longitudeDelta: 0.02
                        }}
                        />
                    </View>
                    <View style={styles.detailContainerStyle}>
                        <Text style={styles.textStyle}>{job.company}</Text>
                        <Text style={styles.textStyle}>{job.formattedRelativeTime}</Text>
                        
                   </View>
                   {/* <Text style={{ textAlign: 'justify' , marginBottom: 10}}>{job.snippet.replace(/<b>/,'').replace(/<\/b>/,'')}</Text> */}
                        <Button
                        
                        title='Apply Job'
                        backgroundColor='#03A9F4'
                        onPress={this.onButtonPress.bind(this,job.url)}
                        />
                
                
                </Card>
            )
        })
    }
    render() { 
        return (
            <ScrollView>
                <Header headerText='Your Saved Jobs'/>
                {this.renderJobs()}
            </ScrollView>
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
