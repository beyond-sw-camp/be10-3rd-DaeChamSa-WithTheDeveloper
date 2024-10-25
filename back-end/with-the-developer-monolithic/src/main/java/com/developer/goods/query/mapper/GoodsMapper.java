package com.developer.goods.query.mapper;

import com.developer.goods.query.dto.GoodsResponseDTO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface GoodsMapper {
    List<GoodsResponseDTO> selectAllGoods(int offset);

//    굿즈 코드로 조회
    GoodsResponseDTO selectGoodsByCode(@Param("goodsCode") Long goodsCode);

//    전체 굿즈 수 조회
    int selectTotalGoodsCount();
}
