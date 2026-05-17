import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAnalytics } from '../hooks/useAnalytics';
import Svg, { Path, Defs, LinearGradient, Stop, Circle } from 'react-native-svg';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<any, 'AnalyticsDashboard'>;

export default function AnalyticsDashboardScreen({ navigation }: Props) {
  const { period, metrics, subjectBreakdown, trendData, loading, changePeriod } = useAnalytics();

  const renderTrendChart = () => {
    // Basic SVG line chart
    const width = 340;
    const height = 150;
    
    // Map data to coordinates
    const points = trendData.map((d, i) => {
      const x = (i / (trendData.length - 1)) * width;
      const y = height - (d.accuracy / 100) * height;
      return `${x},${y}`;
    }).join(' L ');
    
    const d = `M 0,${height - (trendData[0].accuracy / 100) * height} L ${points}`;
    
    // Fill area below line
    const areaD = `${d} L ${width},${height} L 0,${height} Z`;

    return (
      <View style={styles.chartContainer}>
        <Svg width={width} height={height}>
          <Defs>
            <LinearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0" stopColor="#4F46E5" stopOpacity="0.2" />
              <Stop offset="1" stopColor="#4F46E5" stopOpacity="0" />
            </LinearGradient>
          </Defs>
          <Path d={areaD} fill="url(#grad)" />
          <Path d={d} fill="none" stroke="#4F46E5" strokeWidth={3} />
          {trendData.map((data, i) => {
             const x = (i / (trendData.length - 1)) * width;
             const y = height - (data.accuracy / 100) * height;
             return (
               <Circle key={i} cx={x} cy={y} r={4} fill="white" stroke="#4F46E5" strokeWidth={2} />
             )
          })}
        </Svg>
        <View style={styles.chartXAxis}>
          {trendData.map((d, i) => (
            <Text key={i} style={styles.chartLabel}>{d.date}</Text>
          ))}
        </View>
      </View>
    );
  };

  const renderHeatmap = () => {
    // Mock heatmap
    const days = Array.from({ length: 30 });
    return (
      <View style={styles.heatmapGrid}>
        {days.map((_, i) => {
          const intensity = Math.random();
          let color = '#EEF2FF'; // light
          if (intensity > 0.8) color = '#312E81'; // deepest
          else if (intensity > 0.5) color = '#4F46E5'; // deep
          else if (intensity > 0.2) color = '#A5B4FC'; // mid
          
          return (
            <View key={i} style={[styles.heatmapCell, { backgroundColor: color }]} />
          );
        })}
      </View>
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Analytics</Text>
        <TouchableOpacity style={styles.periodSelector}>
          <Text style={styles.periodText}>{period}</Text>
          <Ionicons name="chevron-down" size={16} color="#4F46E5" />
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#4F46E5" style={{ marginTop: 40 }} />
      ) : (
        <View style={styles.content}>
          {/* Metrics Horizontal Scroll */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.metricsScroll}>
            <View style={styles.metricCard}>
              <Text style={styles.metricLabel}>Total Questions</Text>
              <Text style={styles.metricValue}>{metrics.totalQuestions}</Text>
            </View>
            <View style={styles.metricCard}>
              <Text style={styles.metricLabel}>Avg Accuracy</Text>
              <Text style={[styles.metricValue, { color: metrics.averageAccuracy >= 70 ? '#10B981' : '#F59E0B' }]}>
                {metrics.averageAccuracy}%
              </Text>
            </View>
            <View style={styles.metricCard}>
              <Text style={styles.metricLabel}>Tests Completed</Text>
              <Text style={styles.metricValue}>{metrics.testsCompleted}</Text>
            </View>
            <View style={styles.metricCard}>
              <Text style={styles.metricLabel}>Est. Study Time</Text>
              <Text style={styles.metricValue}>{metrics.estimatedStudyTime}m</Text>
            </View>
          </ScrollView>

          {/* Accuracy Trend Chart */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Accuracy Trend</Text>
            {renderTrendChart()}
          </View>

          {/* Practice Heatmap */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Practice Heatmap</Text>
            {renderHeatmap()}
            <View style={styles.heatmapLegend}>
              <Text style={styles.legendText}>Less</Text>
              <View style={[styles.legendCell, { backgroundColor: '#EEF2FF' }]} />
              <View style={[styles.legendCell, { backgroundColor: '#A5B4FC' }]} />
              <View style={[styles.legendCell, { backgroundColor: '#4F46E5' }]} />
              <View style={[styles.legendCell, { backgroundColor: '#312E81' }]} />
              <Text style={styles.legendText}>More</Text>
            </View>
          </View>

          {/* Subject Breakdown */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Subject Breakdown</Text>
            {subjectBreakdown.map((sub) => (
              <TouchableOpacity key={sub.id} style={styles.subjectRow} onPress={() => navigation.navigate('SubjectDeepDive', { subjectId: sub.id })}>
                <View style={styles.subjectHeader}>
                  <Text style={styles.subjectName}>{sub.name}</Text>
                  <View style={styles.subjectStatsRight}>
                    <Text style={styles.subjectAccuracy}>{sub.accuracy}%</Text>
                    <Ionicons 
                      name={sub.trend === 'up' ? 'arrow-up' : sub.trend === 'down' ? 'arrow-down' : 'remove'} 
                      size={16} 
                      color={sub.trend === 'up' ? '#10B981' : sub.trend === 'down' ? '#EF4444' : '#9CA3AF'} 
                    />
                  </View>
                </View>
                
                <View style={styles.barContainer}>
                  <View style={[styles.barFill, { width: `${sub.accuracy}%`, backgroundColor: sub.accuracy >= 70 ? '#10B981' : '#F59E0B' }]} />
                </View>

                <View style={styles.subjectFooter}>
                  <Text style={styles.subjectCount}>{sub.questionCount} Questions</Text>
                  <Text style={styles.worstTopic}>Needs work: {sub.worstTopic}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F4F6' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, paddingTop: 48, backgroundColor: 'white' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#111827' },
  periodSelector: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#EEF2FF', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16 },
  periodText: { color: '#4F46E5', fontWeight: 'bold', marginRight: 4 },
  content: { padding: 16 },
  metricsScroll: { marginBottom: 24, paddingBottom: 8 },
  metricCard: { width: 140, backgroundColor: 'white', padding: 16, borderRadius: 16, marginRight: 12, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10, elevation: 2 },
  metricLabel: { color: '#6B7280', fontSize: 12, marginBottom: 8 },
  metricValue: { color: '#111827', fontSize: 24, fontWeight: 'bold' },
  section: { backgroundColor: 'white', borderRadius: 16, padding: 20, marginBottom: 24 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#111827', marginBottom: 16 },
  chartContainer: { alignItems: 'center', paddingVertical: 10 },
  chartXAxis: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginTop: 8 },
  chartLabel: { fontSize: 10, color: '#9CA3AF' },
  heatmapGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 4 },
  heatmapCell: { width: 16, height: 16, borderRadius: 4 },
  heatmapLegend: { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', marginTop: 16 },
  legendText: { fontSize: 10, color: '#6B7280', marginHorizontal: 4 },
  legendCell: { width: 12, height: 12, borderRadius: 2, marginHorizontal: 2 },
  subjectRow: { borderBottomWidth: 1, borderBottomColor: '#F3F4F6', paddingVertical: 16 },
  subjectHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  subjectName: { fontWeight: 'bold', color: '#374151', fontSize: 16 },
  subjectStatsRight: { flexDirection: 'row', alignItems: 'center' },
  subjectAccuracy: { fontWeight: 'bold', color: '#111827', marginRight: 8 },
  barContainer: { height: 6, backgroundColor: '#F3F4F6', borderRadius: 3, marginBottom: 8 },
  barFill: { height: '100%', borderRadius: 3 },
  subjectFooter: { flexDirection: 'row', justifyContent: 'space-between' },
  subjectCount: { fontSize: 12, color: '#6B7280' },
  worstTopic: { fontSize: 12, color: '#EF4444', fontStyle: 'italic' },
});
