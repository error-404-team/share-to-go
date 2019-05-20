import React from 'react'
import * as firebase from 'firebase'
import RecipeReviewCard from '../../RecipeReviewCard'
import './styles/mySidenav.css'
import './styles/menuProfile.css'

export function openNavNearbyUsers() {
    document.getElementById("mySidenavNearbyUsers").style.width = "70%";
}

export function closeNavNearbyUsers() {
    document.getElementById("mySidenavNearbyUsers").style.width = "0";
}

class SidenavNearbyUsersUI extends React.Component {
    constructor(props) {
        super(props)
        this.state = { ...props, user: {}, location: {}, location_near_by_users: [] }
    }
    componentDidMount() {
        firebase.database().ref(`users/${this.state.dataSignIn.uid}`).once("value").then((snapshot) => {

            this.setState({
                user: {
                    displayName: snapshot.child('displayName').val(),
                    phoneNumber: snapshot.child('phoneNumber').val(),
                    photoURL: snapshot.child('photoURL').val(),
                    userId: snapshot.child('userId').val()
                }
            })
        })

        firebase.database().ref(`location/${this.state.dataSignIn.uid}`).once("value").then((snapshot) => {
            this.setState({
                location: {
                    lat: snapshot.child('lat').val(),
                    lng: snapshot.child('lng').val(),
                    location_id: snapshot.child('location_id').val(),
                    location_name: snapshot.child('location_name').val(),
                    place_id: snapshot.child('place_id').val(),
                }
            })
        })

        firebase.database().ref(`location_near_by_users/${this.state.dataSignIn.uid}`).once("value").then((snapshot) => {
            var arr = []
            snapshot.forEach((childSnapshot) => {
                var childData = childSnapshot.val();
                arr.push(childData)
            })

            console.log(arr);
            this.setState({
                location_near_by_users: arr
            })

        })
    }


    render() {
        const fullWidth = window.innerWidth;
        const fullHeight = window.innerHeight;
        const {location_near_by_users} =this.state
        return (
            <div
                id="mySidenavNearbyUsers"
                className="overlay-nearby-users"

            >
                <div
                    style={{
                        width: '100%',
                        height: '5%',
                        backgroundColor: '#1D385A',
                    }}
                >
                    <a href="javascript:void(0)" className="closebtn-nearby-users fa fa-close" onClick={() => closeNavNearbyUsers()}></a>
                </div>

                <div
                    className="mm-navbars_top-nearby-users"
                >
                    <div className="mm-navbar-nearby-users mm-navbar_size-2-nearby-users">
                        <img src={this.state.user.photoURL} />
                        <span style={{ display: "block", fontSize: "18px" }}>{this.state.user.displayName} </span>
                        <span style={{ display: "block", fontSize: "18px" }}>{this.state.location.location_name} </span>
                    </div>

                </div>
                <div className="mm-panels-nearby-users">
                    <div id="panel-menu-nearby-users" className="mm-panel-nearby-users mm-panel_opened-nearby-users" style={{
                        WebkitTransform: 'translate3d(0,0,0)',
                        transform: "translate3d(0,0,0)",
                        backgroundColor: "#274D7D"
                    }}>
                        {
                            location_near_by_users.map((items) => {
                               return <RecipeReviewCard {...items}/>
                            })
                        }
                    </div>
                </div>
                {/* <div className="overlay-content">
                    {this.props.children}
                </div> */}
            </div>

        )
    }

}

export default SidenavNearbyUsersUI;