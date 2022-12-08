import { Context } from "../App";
import { useContext, useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Pagination from 'react-js-pagination';
import styled from "styled-components"; 

const MajorDetail = () => {
    // Styled-components 페이지 네이션만 적용
    const PaginationBox = styled.div`
    .pagination { display: flex; justify-content: center; margin-top: 15px;}
    ul { list-style: none; padding: 0; }
    ul.pagination li {
        display: inline-block; 
        width: 30px;
        height: 30px; 
        border: 1px solid #e2e2e2;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1rem; 
    }
    ul.pagination li:first-child{ border-radius: 5px 0 0 5px; }
    ul.pagination li:last-child{ border-radius: 0 5px 5px 0; }
    ul.pagination li a { text-decoration: none; color: black; font-size: 1rem; }
    ul.pagination li.active a { color: white; }
    ul.pagination li.active { background-color: orange; }
    ul.pagination li a:hover,
    ul.pagination li a.active { color: blue; }
    `


    const {category,hospitalData,} = useContext(Context);
    const [page, setPage] = useState(1);
    const navigate = useNavigate();
    
    
    
    let {id} = useParams(); 
    

    // 과목별 필터링
    const idFilter = hospitalData
    .filter(major=> major.진료과목내용명.includes( category[id].name));
    
    // 페이지 핸들링 함수
    const handlePageChange =(page)=>{ 
        setPage(page); 
        navigate()
        
    }   

    console.log(page); 
    
    

    return ( 
        <div> 
            <h2>{category[id].name}</h2> 
            <div className="detail__title">                
                <h4>진료과목</h4>기준으로 <br />
                검색된 병원 목록입니다               
            </div>

            {  
    idFilter.slice( 
        10*(page-1),   
        10*(page-1)+10 
    ).map((item, majorid)=>{    
        if(!( majorid >= 0 && majorid <10 )) {
            return null;
        }          
        return (
        <div key={majorid} item={item}>            
    <Link className="linktext" to={'/majordetail/'+id+'/'+(majorid+ 10*(page-1))}>
        
    <div className="detail__box">               
            <h4>{item.사업장}</h4>
            <p>{item.주소}</p>  
        <div className="detail__box2"> 
            <div>의료인수 <br />
            {item.의료인수}
            </div> 
            <div>입원실수 <br />
            {item.입원실수}
            </div> 
            <div>병상수 <br />
            {item.병상수}
            </div> 
        </div>
    </div>
        
    </Link>                 
        </div>
    )  
})     
    } 

    <PaginationBox>
    <Pagination
    //activePage: 현재 페이지
        activePage={page}
        //itemsCountPerPage: 한 페이지당 보여줄 리스트 아이템의 개수
        itemsCountPerPage={10}
        //totalItemsCount: 총 아이템의 개수
        totalItemsCount={idFilter.length-1}
        //pageRangeDisplayed: Paginator 내에서 보여줄 페이지의 범위
        pageRangeDisplayed={5}
        // 이전, 다음페이지
        prevPageText="‹"
        nextPageText="›"
        // 페이지가 바뀔때 핸들링 해줄함수
        onChange={handlePageChange}
    />
    </PaginationBox>
    
    
        </div>
    );
}



export default MajorDetail;