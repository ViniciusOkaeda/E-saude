import React, {useState, useEffect} from 'react';
import './index.css';

const StyledCard1 = (svas) => {


    return(
        <div className="containerStyledCard1">
            <table>
                <tr className="StyledBorder">
                    <th className="StyledTableImg">SVA</th>
                    <th className="StyledName">NOME</th>
                    <th className="StyledStatus">STATUS</th>
                </tr>

                {svas.svas.map((sva, idx) => {

                    return(
                        <tr key={idx} className={`StyledStatusColor ${sva.status === "ACTIVE" ? "active" : "inactive"}`}>
                            <td className="StyledTableImg"><img src={sva.image} alt="SVA_Image"/> </td>
                            <td className="StyledName">{sva.name}</td>
                            <td className="StyledStatus"> 
                                <h4 >
                                    {sva.status === "INACTIVE" ? "Inativo" : "Ativo"}
                                </h4>
                            
                            </td>
                        </tr>
                    );
                })}

            </table>
        </div>
    );
}

export default StyledCard1;