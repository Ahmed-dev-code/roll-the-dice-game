const Die = (props) => {
    return ( 
        <div className={`dice-face ${props.className}`} onClick={props.handleFreezing}>
            <img src={require(`../../public/ressources/Dice-${props.num}.png`)} alt="" />
        </div>
     );
}  
 
export default Die;