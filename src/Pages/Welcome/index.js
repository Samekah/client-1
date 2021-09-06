import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

const Welcome = () => {

    const { push } = useHistory();

    const startGroomGame = () => {
        push('/game');
    }

    const startBrideGame = () => {
        push('/game');
    }

    return (
        <main>
            <h1>Welcome!</h1>
            <h2>How to play...</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam volutpat purus sit amet ipsum varius, at varius lacus tempor. Sed semper mi et nibh suscipit, at consectetur lacus tristique. Suspendisse tempor posuere augue. Vestibulum lobortis dolor libero, in congue turpis tempus ac. Nullam pretium nisi dui, quis viverra sapien ullamcorper quis. Pellentesque sit amet arcu congue, vulputate nisl at, dictum lacus. In vitae velit turpis. Etiam rutrum nunc ac sem lacinia accumsan. Cras laoreet magna dui, in rhoncus orci pulvinar ac. Aliquam erat volutpat. Donec luctus nibh efficitur odio varius, vitae porttitor velit venenatis.</p>
            <h2>Select an option below to start the game..</h2>
            <button onClick={startGroomGame}>I'm on the groom's side!</button>
            <button onClick={startBrideGame}>I'm on the bride's side!</button>
        </main>
    );
}
 
export default Welcome;