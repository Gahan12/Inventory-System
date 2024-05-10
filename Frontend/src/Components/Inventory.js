import InventoryHeader from "./InventoryHeader";

function Inventory(props) {
    // console.log(props);
    return ( 
        <>
            <div className="">
                <InventoryHeader data={props.data} />
            </div>
        </>
     );
}

export default Inventory;