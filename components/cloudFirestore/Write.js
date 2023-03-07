import firebase from 'firebase/app'
import 'firebase/firestore'

const WriteToCloudFirestore = () => {
    const sendData = () => {
        try {
            firebase
                .firestore()
                .collection('myCollection')
                .doc('my_document')
                .set({
                    name: "y/n",
                    email: "email@11.com",
                    sent: false
                })
                .then(alert('Data was successfully sent'))
        } catch (error) {
            console.log(error)
            alert(error)
        }
    }

    return (
        <button onClick={sendData}>Send data</button>
    )
}

export default WriteToCloudFirestore