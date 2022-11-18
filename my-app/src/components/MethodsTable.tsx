import MethodCard from './MethodCard';

export default function MethodsTable(props: {methods: any}){
    
    const methods = props.methods;

    const methodsList = () => {
        if(methods.length > 0){
            return methods.map((method: any) => {
                return <MethodCard number={method['numero']}></MethodCard>
            })
        }
        return <div>You dont have payment methods register</div>
    }
    return (
        <div>
            <h1>Payment methods</h1>
            <div className="method-table">
                {methodsList()}
            </div>
        </div>
    )
}