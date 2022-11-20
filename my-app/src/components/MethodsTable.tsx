import PaginatedItems from './PaginatedItems';

export default function MethodsTable(props: {methods: any}){
    


    const methods = [
        "4929103134210873",
        "4024007193212775",
        "4532866727633094",
        "4024007192577202",
        "4532813197558740",
        "5463386094853159",
        "5553900219734846",
        "5343925410485810",
        "5209457282139054",
        "5424113217003456",
        "340907366978158",
        "379645239680007",
        "372501682931990",
        "378698415900062",
        "376762293625183",
    ];

    const methodsList = () => methods.length > 0 ? <PaginatedItems itemsPerPage={8} items={methods} type={0} ></PaginatedItems> : <div>You dont have payment methods register</div>

    return (
        <div>
            <h1>Payment methods</h1>
            <div className="method-table">
                {methodsList()}
            </div>
        </div>
    )
}