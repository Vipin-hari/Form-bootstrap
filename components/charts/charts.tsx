"use client";
import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { PieChart } from '@mui/x-charts/PieChart'; 
import { Card, Select, MenuItem, FormControl } from '@mui/material';
import Inputs from '../Input/Inputs';
import toast from 'react-hot-toast';

export default function LineChartPage() {
    const [inputRows, setInputRows] = React.useState<{ name: string; value: string }[]>([{ name: '', value: '' }]);
    const [data, setData] = React.useState<{ id: number; value: number; label: string }[]>([]);
    const [chartType, setChartType] = React.useState<'line' | 'pie'>('line'); 

    React.useEffect(() => {
        const savedRows = localStorage.getItem('inputRows');
        if (savedRows) {
            setInputRows(JSON.parse(savedRows));
        }

        const savedData = localStorage.getItem('chartData');
        if (savedData) {
            setData(JSON.parse(savedData));
        }
    }, []);

    const addInputRow = () => {
        setInputRows(prevRows => [...prevRows, { name: '', value: '' }]);
    };

    const handleInputChange = (index: number, field: 'name' | 'value', value: string) => {
        setInputRows(prevRows => {
            const updatedRows = [...prevRows];
            updatedRows[index][field] = value;
            const newData = updatedRows
                .map((row, idx) => ({
                    id: idx,
                    value: parseFloat(row.value),
                    label: row.name,
                }))
                .filter(row => row.label && !isNaN(row.value)); 
            setData(newData);
            return updatedRows;
        });
    };

    const removeInputRow = (index: number) => {
        setInputRows(prevRows => {
            const updatedRows = prevRows.filter((_, i) => i !== index);
            const newData = updatedRows
                .map((row, idx) => ({
                    id: idx,
                    value: parseFloat(row.value),
                    label: row.name,
                }))
                .filter(row => row.label && !isNaN(row.value));
            setData(newData);
            localStorage.setItem('chartData', JSON.stringify(newData));
            localStorage.setItem('inputRows', JSON.stringify(updatedRows));
            return updatedRows;
        });
    };

    const submitData = () => {
        const newData = inputRows
            .map((row, idx) => ({
                id: idx,
                value: parseFloat(row.value),
                label: row.name,
            }))
            .filter(row => row.label && !isNaN(row.value));
        setData(newData);
        localStorage.setItem('chartData', JSON.stringify(newData));
        localStorage.setItem('inputRows', JSON.stringify(inputRows));
        return toast.success('Data saved successfully');
    };

    const clearData = () => {
        setInputRows([{ name: '', value: '' }]);
        setData([]);
        localStorage.removeItem('chartData');
        localStorage.removeItem('inputRows');
    };

    const calculateChartWidth = () => {
        const windowWidth = typeof window !== "undefined" ? window.innerWidth : 640;
        return Math.min(windowWidth - 40, 750); 
    };

    return (
        <div className="container py-5 d-flex flex-column align-items-center">
            <Card className="p-3 w-100" style={{ maxWidth: '800px' }}>
                <h1 className="text-center">Analytics Chart</h1>
                <FormControl fullWidth className="mb-4">
                    <Select
                        labelId="chart-type-label"
                        value={chartType}
                        onChange={(e) => setChartType(e.target.value as 'line' | 'pie')}
                    >
                        <MenuItem value="line">Line Chart</MenuItem>
                        <MenuItem value="pie">Pie Chart</MenuItem>
                    </Select>
                </FormControl>

                <div className="w-100 d-flex justify-content-center">
                    {chartType === 'line' ? (
                        <LineChart
                            colors={['#1976D2']}
                            width={calculateChartWidth()} 
                            height={250}
                            series={[{ data: data.map(d => d.value), label: 'User Input Data' }]}
                            xAxis={[{ scaleType: 'point', data: data.map(d => d.label) }]}
                        />
                    ) : (
                        <PieChart
                            series={[{ data: data }]}
                            width={calculateChartWidth()} 
                            height={250}
                        />
                    )}
                </div>
            </Card>
            <Inputs 
                inputRows={inputRows} 
                handleInputChange={handleInputChange} 
                addInputRow={addInputRow} 
                submitData={submitData} 
                clearData={clearData} 
                removeInputRow={removeInputRow}
            />
        </div>
    );
}
