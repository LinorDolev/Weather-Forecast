import React from 'react';
import './App.css';
import {Navbar, Nav, Icon, Toggle, RadioGroup, Radio } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';
import Routes from '../../routing/routes';
import {HashRouter} from "react-router-dom";


export default class App extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            darkMode: false
        }
    }

    toggleDarkMode(){
        let prevDarkMode = this.state.darkMode;
        this.setState({
           darkMode:  !prevDarkMode
        }, () => {
            console.log("Dark Mode: " + this.state.darkMode);
        });

    }

    render(){
        let theme = this.state.darkMode ? 'theme-dark': 'theme-light';

        return (
            <div className={`app ${theme}`}>
                <HashRouter>
                    <WeatherNavbar darkMode={this.state.darkMode}
                                   onDarkModeChanged={() => this.toggleDarkMode()}/>
                        <RadioGroup id="temp-scale-radio" name="radioList" inline appearance="picker" defaultValue="C" >
                            <Radio id="celsius-scale" value="C">Celsius</Radio>
                            <Radio id="fahrenheit-scale" value="F">Fahrenheit</Radio>
                        </RadioGroup>

                     <Routes/>
                </HashRouter>
            </div>
        );
    }
}



function WeatherNavbar(props) {
    const {darkMode, onDarkModeChanged} = props;
    return (
        <Navbar id={'navbar'} className={'nav'}>
            <Navbar.Header>
                <a className="logo" href={"/"}>
                    HeroWeather
                </a>
            </Navbar.Header>
            <Navbar.Body>
                <Nav pullRight>
                    <Nav.Item href={"/#/home/"} icon={<Icon icon="home" />}>
                        Home
                    </Nav.Item>
                    <Nav.Item href={"/#/favorites/"} icon={<Icon icon="star" />}>
                        Favorites
                    </Nav.Item>

                    <small>
                        <Toggle className='toggle-theme'
                                size="lg"
                                checkedChildren="Dark"
                                unCheckedChildren="Light"
                                value={darkMode}
                                onChange={onDarkModeChanged}
                        />
                    </small>
                </Nav>

            </Navbar.Body>

        </Navbar>
    );
}
