import React, {useState} from 'react';
import ReactPaginate from 'react-paginate';
import RowTransaction from './RowTransaction';
import MethodCard from './MethodCard';
function Items(props: {currentItems: any, type: Number}) {

    const {currentItems, type} = props;

    return (
        <div className="items">
        {currentItems && currentItems.map((data,index) => (
        <div>
            {type === 1 
            ? <RowTransaction key={index} isHeader={false} id={data['id']} estado={data['estado']} fecha={data['fecha']} franquicia={data['franquicia']} 
                    monto={data['monto']} nroCoutas={data['nroCoutas']} sede={data['sede']} userId={data['userId']} metodoId={data['metodoId']}></RowTransaction>
            : <MethodCard key={index} number={data}></MethodCard>
            }

        </div>
        ))}
        </div>
    );
}

export default function PaginatedItems( props: {items: any, itemsPerPage: number, type: number} ) {

    const {items, itemsPerPage, type} = props;

    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);

    // Simulate fetching items from another resources.
    // (This could be items from props; or items loaded in a local state
    // from an API endpoint with useEffect and useState)
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    const currentItems = items.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(items.length / itemsPerPage);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % items.length;
        console.log(
        `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
    };

    return (
        <div> 
            <Items currentItems={currentItems} type={type}></Items>
            <ReactPaginate
                className="pagination"
                breakLabel="..."
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                renderOnZeroPageCount={null}
            />        
        </div>
    )
}