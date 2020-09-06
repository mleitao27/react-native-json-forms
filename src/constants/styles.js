/* 
 * globalStyles (Object)
 * Description : Object containing some styles used repeatedly
 * throughout the application
 */

 // Imports
 import { StyleSheet } from 'react-native';
 
 /************************************************
  * 
  * OBJECT
  * 
  ************************************************/
 const styles = StyleSheet.create({
     shadow: { 
         shadowColor: '#E5E5E5',
         shadowOffset: {
             width: -5,
             height: 10,
         },
         shadowRadius: 3,
         shadowOpacity: 0.5,
         elevation: 3,
     }
 });
 
 // Export Object
 export default styles;