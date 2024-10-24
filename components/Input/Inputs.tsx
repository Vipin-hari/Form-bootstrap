import { Button, Card, IconButton, TextField, Tooltip } from '@mui/material';
import { Trash } from 'lucide-react';
import React, { useEffect, useRef } from 'react';

interface InputRow {
    name: string;
    value: string;
}

interface InputsProps {
    inputRows: InputRow[];
    handleInputChange: (index: number, field: 'name' | 'value', value: string) => void;
    addInputRow: () => void;
    removeInputRow: (index: number) => void;
    submitData: () => void;
    clearData: () => void;
}

const Inputs: React.FC<InputsProps> = ({ inputRows, handleInputChange, addInputRow, removeInputRow, submitData, clearData }) => {
    const inputContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (inputContainerRef.current) {
            inputContainerRef.current.scrollTop = inputContainerRef.current.scrollHeight;
        }
    }, [inputRows]);

    return (
        <Card className="p-3 mb-4" style={{marginTop:"20px"}}>
            <h1 className="h3 mb-2">Analytics Line Chart</h1>

            <div className="mb-4">
                <div ref={inputContainerRef} className='overflow-hidden' style={{ maxHeight: '240px' }}>
                    {inputRows.map((row, index) => (
                        <div key={index} className="row mb-3 align-items-center">
                            <div className="col-md-5 mb-2 mb-md-0">
                                <TextField
                                    type="text"
                                    value={row.name}
                                    onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                                    placeholder="Enter Name"
                                    variant='outlined'
                                    label='Name'
                                    fullWidth
                                />
                            </div>
                            <div className="col-md-5 mb-2 mb-md-0">
                                <TextField
                                    type="number"
                                    value={row.value}
                                    onChange={(e) => handleInputChange(index, 'value', e.target.value)}
                                    placeholder="Enter Value"
                                    variant='outlined'
                                    label='Value'
                                    fullWidth
                                />
                            </div>
                            <div className="col-md-2 text-center">
                                <IconButton onClick={() => removeInputRow(index)} aria-label="Remove">
                                    <Tooltip title='Remove'>
                                        <Trash className='text-danger' />
                                    </Tooltip>
                                </IconButton>
                            </div>
                        </div>
                    ))}
                </div>

                <div className='text-center mt-1'>
                    <Button onClick={addInputRow} variant='contained' color='primary'>
                        Add Input Row
                    </Button>
                </div>
            </div>

            <div className="d-flex justify-content-center">
                <Button onClick={submitData} variant='contained' color='primary'>
                    Save Data
                </Button>
                <Button onClick={clearData} variant='outlined' color='error' className='ms-3'>
                    Clear Chart
                </Button>
            </div>
        </Card>
    );
};

export default Inputs;
