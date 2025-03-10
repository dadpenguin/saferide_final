
import franchiseArray from '../../drivers'

const dbArray = [...franchiseArray];


export default FetchFranchise = (franchiseVal) => {

    // resolve for no errors

    // reject for errors

    return new Promise ((resolve,reject)=>{
        // start of the async function

        try {
            setTimeout(()=>{

                const data = dbArray.find(item => item.franchiseNumber === parseInt(franchiseVal));

                if (data)
                    resolve({ok: true, body: data})
                else {
                    resolve({ok: false})
                }
                


            },0)
        } catch (error) {
            reject(error)
        }

    }

    )

}