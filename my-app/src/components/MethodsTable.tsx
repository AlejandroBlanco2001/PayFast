import PaginatedItems from './PaginatedItems';

export default function MethodsTable(props: {methods: Array<any>}){

    const test = [
        {"numero":"4929103134210873", "id": 1},
        {"numero":"4024007193212775", "id": 1},
        {"numero":"4532866727633094", "id": 1},
        {"numero":"4024007192577202", "id": 1},
        {"numero":"4532813197558740", "id": 1},
        {"numero":"5463386094853159", "id": 1},
        {"numero":"5553900219734846", "id": 1},
        {"numero":"5343925410485810", "id": 1},
        {"numero":"5209457282139054", "id": 1},
        {"numero":"5424113217003456", "id": 1},
        {"numero":"340907366978158", "id": 1},
        {"numero":"379645239680007", "id": 1},
        {"numero":"372501682931990", "id": 1},
        {"numero":"378698415900062", "id": 1},
        {"numero":"376762293625183", "id": 1},
    ];

    // change the test ids in ascending order
    test.forEach((item, index) => {
        item.id = index + 1;
    });

    const methods = props.methods;    

    const methodsList = () => methods.length > 0 ? <PaginatedItems itemsPerPage={9} items={methods} type={0} ></PaginatedItems> : <div>You dont have payment methods register</div>

    return (
        <div className="method-availables">
            <h1>Payment methods</h1>    
            <div className="method-table">
                {methodsList()}
            </div>
        </div>
    )
}