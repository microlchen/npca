import firebase from 'firebase/app'
import 'firebase/firestore'

const ReadToCloudFirestore = () => {
    const sendData = () => {
        try {
            firebase
                .firestore()
                .collection('myCollection')
                .doc('my_document')
                .onSnapshot(function (doc){
                    console.log(doc.data())
                })
            alert('Data was successfully fetched')
        } catch (error) {
            console.log(error)
            alert(error)
        }
    }
    return (
        <button onClick={sendData}>Fetch data</button>
    )
}

export default ReadToCloudFirestore