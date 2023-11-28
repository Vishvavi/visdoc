import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import moment from 'moment'




const WeekDaylist = ({ date, onSelectDate, selected }) => {
  /**
   * use moment to compare the date to today
   * if today, show 'Today'
   * if not today, show day of the week e.g 'Mon', 'Tue', 'Wed'
   */
  const day = moment(date).format('ddd')
  // get the day number e.g 1, 2, 3, 4, 5, 6, 7
  const dayNumber =moment(date).format('D')
  const month=moment(date).format('MMMM')

  // get the full date e.g 2021-01-01 - we'll use this to compare the date to the selected date
  const fullDate = moment(date).format('YYYY-MM-DD')
  return (
    <TouchableOpacity
      onPress={() => onSelectDate(day)}
      style={[styles.card, selected === day && { backgroundColor: "#eaeaea" }]}
    >
      <Text
        style={[styles.big, selected === day && { color: "#808080" }]}
      >
        {day.toUpperCase()}
      </Text>
     
   {//   <View style={{ height: moderateScale(5) }} />
    // <Text style={[styles.medium,selected===fullDate&&{color:'#808080'}]}>
      //  {month}
     // </Text>
   }
     { //<Text
       // style={[
       //   styles.small,
        //  selected === fullDate && { color: "#808080"},
       // ]}
      //</TouchableOpacity>>
     //   {dayNumber}
     // </Text>
}
    </TouchableOpacity>
  )
}

export default WeekDaylist;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#E6C402',
    borderRadius: 10,
    borderColor: '#ddd',
    padding: 15,
    marginVertical: 10,
    alignItems: 'center',
   // height: verticalScale(60),
    width: 60,
    marginHorizontal: 5,
    borderWidth:1,
    borderColor:'#808080',
    alignItems:'center',
    justifyContent:'center'
  },
  big: {
   // fontWeight: 'bold',
    fontSize: 12,
    fontFamily: 'SpaceGrotesk-Regular',
    color:'#11266c'
  },
  medium: {
    fontSize: 10,
    fontFamily: 'SpaceGrotesk-Regular',
    color:'#11266c'
  },
  small: {
    fontSize: 17,
    fontFamily: 'SpaceGrotesk-Regular',
    color:'#11266c'
  },
})