const Header = (props) => {
    return (
        <div className="head">
            <h3 >Best: <span className="high-score">{props.highScore}</span></h3>
            <div className="rules">
                <h1>Tenzies</h1>
                <p>Roll until all dice are the same. Click each die to to freeze it as its current value between rolls.</p>
            </div>
            <h3 className="counter-title">Rolls: <span className="high-score">{props.rolls}</span></h3>

        </div>
     );
}
 
export default Header;