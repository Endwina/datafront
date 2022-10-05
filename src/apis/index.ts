import { gql } from '@apollo/client';

export const GetDemoDashData = gql`
  query getDemoDashData($endTime: Int!) {
    inbounds(end_time: $endTime) {
      date
      total
    }
    outbounds(end_time: $endTime) {
      date
      total
    }
    domesticIp(end_time: $endTime) {
      date
      total
    }
    overseasIp(end_time: $endTime) {
      date
      total
    }
    totalOutFlow(end_time: $endTime) {
      country
      number
    }
  }
`;

export const GetIndustryInfo = gql`
  query getIndustryInfo {
    industryInfo {
      data {
        id
        industryName
      }
    }
  }
`;

export const GetIndustryInfos = gql`
  query getIndustryInfos($skip: Int, $take: Int) {
    industryInfos(skip: $skip, take: $take) {
      data {
        id
        industryName
        timestamp
      }
      total
    }
  }
`;

export const CreateIndustryInfo = gql`
  mutation createIndustryInfo($industryName: String!) {
    createindustryInfo(industryName: industryName) {
      id
      industryName
    }
  }
`;

export const DeleteIndustryInfo = gql`
  mutation deleteIndustryInfo($id: Int!) {
    deleteindustryInfo(id: $id) {
      id
    }
  }
`;

export const UpdateIndustryInfo = gql`
  mutation updateIndustryInfo($id: Int!, $industryName: String!) {
    updateindustryInfo(id: id, industryName: industryName) {
      id
    }
  }
`;

export const GetIndustryDetail = gql`
  query getIndustryDetail($skip: Int, $take: Int, $industryId: Int) {
    industryDetails(skip: $skip, take: $take, industryId: $industryId) {
      data {
        id
        industryId
        industryTypeName
        timestamp
      }
      total
    }
  }
`;

export const GetSensitiveRules = gql`
  query getSensitiveRules($skip: Int, $take: Int, $industryTypeId: Int) {
    sensitiveRules(skip: $skip, take: $take, industryTypeId: $industryTypeId) {
      data {
        id
        name
        industryTypeId
        rule
        timestamp
      }
      total
    }
  }
`;

export const CreateSensitiveRule = gql`
  mutation createSensitiveRule($createSensitiveRuleInput: CreateSensitiveRuleInput!) {
    createSensitiveRule(createSensitiveRuleInput: $createSensitiveRuleInput) {
      id
      name
      industryTypeId
      rule
    }
  }
`;

export const DeleteSensitiveRule = gql`
  mutation deleteSensitiveRule($id: Int!) {
    deleteSensitiveRule(id: $id) {
      id
    }
  }
`;

export const UpdateSensitiveRule = gql`
  mutation updateSensitiveRule(
    $id: Int!
    $updateSensitiveRuleInput: UpdateSensitiveRyleInput!
  ) {
    updateSensitiveRule(id: $id, updateSensitiveRuleInput: $updateSensitiveRuleInput) {
      id
      name
      industryTypeId
      rule
    }
  }
`;
