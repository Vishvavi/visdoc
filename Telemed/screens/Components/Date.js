import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import moment from 'moment'
import { color } from 'react-native-reanimated'
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const Date = ({ date, onSelectDate, selected }) => {
  /**
   * use moment to compare the date to today
   * if today, show 'Today'
   * if not today, show day of the week e.g 'Mon', 'Tue', 'Wed'
   */
  const day = moment(date).format('ddd')
  // get the day number e.g 1, 2, 3, 4, 5, 6, 7
  const dayNumber =moment(date).format('D')
  const month=moment(date).format('MMM')

  // get the full date e.g 2021-01-01 - we'll use this to compare the date to the selected date
  const fullDate = moment(date).format('YYYY-MM-DD')
  return (
    <TouchableOpacity
      onPress={() => onSelectDate(fullDate)}
      style={[styles.card, selected === fullDate && { backgroundColor: "#eaeaea" }]}
    >
      <Text
        style={[styles.big, selected === fullDate && { color: "#808080" }]}
      >
        {day.toUpperCase()}
      </Text>
     
      <View style={{ }} />
      <Text style={[styles.medium,selected===fullDate&&{color:'#808080'}]}>
        {month}
      </Text>
      <Text
        style={[
          styles.small,
          selected === fullDate && { color: "#808080"},
        ]}
      >
        {dayNumber}
      </Text>
    </TouchableOpacity>
  )
}

export default Date

const styles = StyleSheet.create({
  card: {
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: '#E6C402',
    borderRadius: 10,
    borderColor: '#ddd',
   

    width: 60,
    marginHorizontal: 5,
    borderWidth:1,
    borderColor:'#808080'
  },
  big: {
   // fontWeight: 'bold',
    fontSize: 15,
    fontFamily: 'SpaceGrotesk-Regular',
    color:'#11266c',
    marginTop:10
  },
  medium: {
    fontSize: 14,
    fontFamily: 'SpaceGrotesk-Regular',
    color:'#11266c'
  },
  small: {
    fontSize: 18,
    fontFamily: 'SpaceGrotesk-Regular',
    color:'#11266c',
    marginBottom:10
  },
})